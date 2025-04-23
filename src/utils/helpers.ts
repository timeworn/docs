const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_CDN;

export const getImageUrl = (path: string | undefined): string => {
  return `${baseImageUrl}/${path}`;
};
