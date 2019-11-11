import { readdir, stat } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { Commands } from './types';

const root = join(__dirname, 'commands');

const filepath = (file: string) => join(root, file);

const info = (file: string) => promisify(stat)(filepath(file));

const reducer = async (
  { commands, aliases }: Commands,
  file: string
): Promise<Commands> => {
  try {
    const {
      default: { command, alias, description, todos },
    } = await import(filepath(file));

    return {
      commands: {
        ...commands,
        [file]: {
          command,
          ...(alias ? { alias } : {}),
          ...(description ? { description } : {}),
          ...(todos ? { todos } : {}),
        },
      },
      aliases: {
        ...aliases,
        ...(alias ? { [alias]: file } : {}),
      },
    };
  } catch (error) {
    return { commands, aliases };
  }
};

let cached: Commands | null = null;

export default async (): Promise<Commands> => {
  if (cached === null) {
    const files = await promisify(readdir)(root);
    const stats = await Promise.all(files.map(info));
    const filtered = files.filter((file: string, index: number) =>
      stats[index].isDirectory()
    );
    cached = await filtered.reduce(
      (promise, file) => promise.then(memo => reducer(memo, file)),
      Promise.resolve({ commands: {}, aliases: {} })
    );
  }
  return cached;
};
