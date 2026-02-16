import path from "node:path";
import { x } from "tinyexec";

type Awaitable<T> = T | Promise<T>;

interface PluginContext {
  core: {
    getCollections(): Array<{ name: string }>;
    getOptions(): { workspace?: { dir: string } };
  };
}

interface CompilationContext {
  collection: { name: string };
  filePath: string;
}

interface VFile {
  data: Record<string, any>;
}

export interface Plugin {
  name?: string;
  config?: (this: PluginContext) => Awaitable<void>;
  "index-file"?: {
    generateTypeConfig?(this: PluginContext): string;
    serverOptions?(options: any): void;
  };
  doc?: {
    vfile?(this: CompilationContext & PluginContext, file: VFile): Awaitable<void>;
  };
}

export interface GitHubContributor {
  name: string;
  profileUrl: string;
  avatarUrl: string;
  commits: number;
}

export interface PageMetadataPluginOptions {
  enableContributors?: "github";
  /**
   * GitHub repository in format "owner/repo"
   * Required when enableContributors is set to 'github'
   *
   * @example 'facebook/react'
   */
  githubRepo?: string;
  filter?: (collection: string) => boolean;
}

const cache = new Map<
  string,
  {
    createdAt: Promise<Date | null>;
    contributors?: Promise<GitHubContributor[] | null>;
  }
>();

const ExtendTypes = `{
  /**
   * Creation date of document file, obtained from Git history.
   */
  createdAt?: Date;
  /**
   * GitHub contributors to this document file.
   */
  contributors?: Array<{
    name: string;
    profileUrl: string;
    avatarUrl: string;
    commits: number;
  }>;
}`;

export default function pageMetadata(options: PageMetadataPluginOptions = {}): Plugin {
  const { enableContributors, githubRepo, filter = () => true } = options;

  let cwd: string;

  if (enableContributors === "github" && !githubRepo) {
    throw new Error('githubRepo is required when enableContributors is set to "github"');
  }

  return {
    name: "page-metadata",
    "index-file": {
      generateTypeConfig(this: PluginContext) {
        const lines: string[] = [];
        lines.push("{");
        lines.push("  DocData: {");
        for (const collection of this.core.getCollections()) {
          if (filter(collection.name)) {
            lines.push(`    ${collection.name}: ${ExtendTypes},`);
          }
        }
        lines.push("  }");
        lines.push("}");
        return lines.join("\n");
      },
      serverOptions(options: any) {
        options.doc ??= {};
        options.doc.passthroughs ??= [];
        options.doc.passthroughs.push("createdAt");
        if (enableContributors) {
          options.doc.passthroughs.push("contributors");
        }
      },
    },
    config(this: PluginContext) {
      const { workspace } = this.core.getOptions();
      cwd = workspace ? path.resolve(workspace.dir) : process.cwd();
    },
    doc: {
      async vfile(this: CompilationContext & PluginContext, file: VFile) {
        if (!filter(this.collection.name)) return;

        const filePath = this.filePath;

        if (!cache.has(filePath)) {
          cache.set(filePath, {
            createdAt: getGitCreationDate(filePath, cwd),
            contributors:
              enableContributors === "github" ? getGitHubContributors(filePath, cwd, githubRepo!) : undefined,
          });
        }

        const cached = cache.get(filePath)!;
        const createdAt = await cached.createdAt;

        if (createdAt) {
          file.data["mdx-export"] ??= [];
          file.data["mdx-export"].push({
            name: "createdAt",
            value: createdAt,
          });
        }

        if (cached.contributors) {
          const contributors = await cached.contributors;
          if (contributors && contributors.length > 0) {
            file.data["mdx-export"] ??= [];
            file.data["mdx-export"].push({
              name: "contributors",
              value: contributors,
            });
          }
        }
      },
    },
  };
}

async function getGitCreationDate(file: string, cwd: string): Promise<Date | null> {
  try {
    const out = await x("git", ["log", "--reverse", '--pretty="%ai"', "--", path.relative(cwd, file)], {
      nodeOptions: {
        cwd,
      },
    });

    if (out.exitCode !== 0 || !out.stdout.trim()) return null;

    const firstLine = out.stdout.split("\n")[0];
    const date = new Date(firstLine.replace(/"/g, ""));
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.warn(`Failed to get creation date for ${file}:`, error);
    return null;
  }
}

async function getGitHubContributors(
  file: string,
  cwd: string,
  repo: string,
  token?: string,
): Promise<GitHubContributor[] | null> {
  try {
    const out = await x("git", ["log", "--pretty=%an|%ae", "--", path.relative(cwd, file)], {
      nodeOptions: {
        cwd,
      },
    });

    if (out.exitCode !== 0 || !out.stdout.trim()) return null;

    const authorCommits = new Map<string, { email: string; count: number }>();

    for (const line of out.stdout.split("\n")) {
      if (!line.trim()) continue;
      const [name, email] = line.split("|");
      const existing = authorCommits.get(name);
      if (existing) {
        existing.count++;
      } else {
        authorCommits.set(name, { email, count: 1 });
      }
    }

    const contributors: GitHubContributor[] = [];

    for (const [, { email, count }] of authorCommits.entries()) {
      try {
        const githubUser = await fetchGitHubUser(email, repo, token);
        if (githubUser) {
          contributors.push({
            name: githubUser.login,
            profileUrl: githubUser.html_url,
            avatarUrl: githubUser.avatar_url,
            commits: count,
          });
        }
      } catch (error) {
        console.warn(`Failed to fetch GitHub user for ${email}:`, error);
      }
    }

    contributors.sort((a, b) => b.commits - a.commits);

    return contributors.length > 0 ? contributors : null;
  } catch (error) {
    console.warn(`Failed to get contributors for ${file}:`, error);
    return null;
  }
}

interface GitHubUser {
  login: string;
  html_url: string;
  avatar_url: string;
}

async function fetchGitHubUser(email: string, repo: string, token?: string): Promise<GitHubUser | null> {
  try {
    const [owner, repoName] = repo.split("/");
    const searchUrl = `https://api.github.com/search/commits?q=repo:${owner}/${repoName}+author-email:${email}&per_page=1`;

    const response = await fetch(searchUrl);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as any;

    if (data.items && data.items.length > 0) {
      const author = data.items[0].author;
      return {
        login: author.login,
        html_url: author.html_url,
        avatar_url: author.avatar_url,
      };
    }

    return null;
  } catch (error) {
    console.warn(`Failed to fetch GitHub user for email ${email}:`, error);
    return null;
  }
}
