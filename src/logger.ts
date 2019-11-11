import debug from 'debug';

interface Logger {
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}

const name = 'misc';

const key = (...suffix: string[]): string => [name, ...suffix].join(':');

export const create = (suffix: string): Logger => ({
  log: debug(key(suffix)),
  warn: debug(key(suffix, 'warn')),
  error: debug(key(suffix, 'error')),
});
