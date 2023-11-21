export const getSlugFromText = (text: string = '') => {
  return text
    .trim()
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '')
    .replace(/__+/g, '_');
};
