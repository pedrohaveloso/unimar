/**
 * @return {string}
 */
export const genId = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
