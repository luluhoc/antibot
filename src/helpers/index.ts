// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
export const has = (obj: any, path: string): boolean => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  return !!pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj);
};
