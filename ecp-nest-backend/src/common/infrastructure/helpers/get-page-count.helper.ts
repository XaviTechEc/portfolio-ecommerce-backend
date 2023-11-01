export const getPageCount = (total: number, pageSize: number | undefined) => {
  return Math.ceil(total / (pageSize ?? total));
};
