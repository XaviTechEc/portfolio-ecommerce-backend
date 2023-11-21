export const getCurrentPage = (limit: number, offset: number) => {
  return Math.floor(offset / limit) + 1;
};
