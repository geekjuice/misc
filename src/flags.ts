import { Options } from './types';

export const help = {
  help: {
    alias: 'h',
    description: 'show help',
    type: 'boolean',
  },
};

export const version = {
  version: {
    alias: 'v',
    description: 'show version',
    type: 'boolean',
  },
};

export const sanitize = (flags: Options) =>
  Object.entries(flags).reduce(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (omitted, [name, { description, ...options }]) => ({
      ...omitted,
      [name]: options,
    }),
    {}
  );
