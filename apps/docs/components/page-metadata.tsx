import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Time } from "@/components/ui/time";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GitHubContributor } from "@timeworn/fumadocs-page-metadata";
import { ClockIcon, RefreshCwIcon, SquarePenIcon } from "lucide-react";
import type { FC } from "react";

const maxContributors = 5;

const ContributorProfile: FC<GitHubContributor & { index: number }> = ({
  profileUrl,
  name,
  avatarUrl,
  index,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          className="no-underline"
          href={profileUrl}
          target="_blank"
          style={{
            marginLeft: index > 0 ? "-8px" : "0",
            zIndex: 8 - index,
          }}
        >
          <Avatar>
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </a>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
};

interface PageMetadataProps {
  lastModified?: Date;
  createdAt?: Date;
  contributors?: GitHubContributor[];
}

export const PageMetadata: FC<PageMetadataProps> = ({
  lastModified,
  createdAt,
  contributors,
}) => {
  return (
    <div className="not-prose text-muted-foreground mt-8 flex flex-col items-start justify-between gap-2 text-sm md:flex-row md:items-center">
      {contributors && contributors.length > 0 && (
        <div className="flex items-center gap-2">
          <SquarePenIcon size={16} />
          <div className="flex flex-wrap items-center gap-[-8px]">
            <AvatarGroup>
              {contributors
                .sort((a, b) => {
                  if (a.commits > b.commits) return -1;
                  if (a.commits < b.commits) return 1;
                  return 0;
                })
                .slice(0, maxContributors)
                .map((contributor, index) => (
                  <ContributorProfile
                    key={index}
                    index={index}
                    {...contributor}
                  />
                ))}
              {contributors.length > maxContributors && (
                <AvatarGroupCount>
                  +{contributors.length - maxContributors}
                </AvatarGroupCount>
              )}
            </AvatarGroup>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 empty:hidden">
        {createdAt && (
          <div className="flex items-center gap-2">
            <ClockIcon size={16} />
            <Time format="date" date={createdAt} tooltip />
          </div>
        )}
        {lastModified && (
          <div className="flex items-center gap-2">
            <RefreshCwIcon size={16} />
            <Time format="date" date={lastModified} tooltip />
          </div>
        )}
      </div>
    </div>
  );
};
