declare module "formatic-react" {
  export function useInit<T>(spec: T): any;
  export function Group<T>(spec: T): any;
  export function Text(): any;
  export function List<T>(spec: T): any;
  export function Toggle(): any;
}
