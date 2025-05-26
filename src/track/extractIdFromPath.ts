export const extractIdFromPath = (path: string, basePath: string) => {
  const match = path.match(new RegExp(`^${basePath}/(\\w+)`));
  return match?.[1] || undefined;
};
