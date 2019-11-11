declare module 'cowsay' {
  interface Options {
    text: string;
  }

  export function say(options: Options);
}
