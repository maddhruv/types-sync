export type Dependencies = Array<string>;

export interface Options {
  ignore?: Dependencies;
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
}
