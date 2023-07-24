/* eslint-disable @typescript-eslint/prefer-optional-chain */
export const has = (obj: unknown, path: string): boolean => {
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  // @ts-expect-error
  return !!pathArray?.reduce((prevObj: any, key: string) => prevObj && prevObj[key], obj);
};
