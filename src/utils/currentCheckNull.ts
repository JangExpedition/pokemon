import { MutableRefObject } from "react";

export const currentCheckNull = <T>(ref: MutableRefObject<T | null>) => {
  return ref.current == null ? false : true;
};
