import chalk from 'chalk';
import table from 'text-table';
import collect from './collect';
import { spaces } from './print';
import { Action, Actions, Command, Option, Options } from './types';

const { bold, blue, cyan, gray } = chalk;

const INDENT = 8;
const SPACING = 3;

type Entries<T> = [string, T][];
type Formatter<T> = (name: string, field: T) => string;
type Formatters<T> = Formatter<T>[];

const prettify = <T>(
  type: string,
  entries: Entries<T>,
  formatters: Formatters<T>
): string => {
  if (entries.length === 0) {
    return gray(`no ${type} available`);
  }
  const items = entries.map(([name, fields]) =>
    formatters.map(formatter => formatter(name, fields))
  );
  return table(items, { hsep: spaces(SPACING) })
    .split('\n')
    .join(`\n${spaces(INDENT)}`);
};

const values = (
  choices: string[],
  initial?: string | number | boolean
): string =>
  choices.length > 0
    ? `[${choices
        .map(choice => (choice === initial ? bold(initial) : choice))
        .join(', ')}]`
    : initial
    ? `[${bold(initial)}]`
    : '';

const aliases = (name: string, alias: string): string =>
  [alias ? `-${alias}` : '', name ? `--${name}` : ''].join(', ');

export const commands = async (): Promise<string> => {
  const collected = await collect();
  const entries = Object.entries(collected.commands);
  return prettify<Command>('commands', entries, [
    command => cyan(command),
    (_, { description = '' }) => description,
    (_, { alias = '' }) => gray(alias ? `(alias: ${alias})` : ''),
  ]);
};

export const actions = async (subcommands: Actions): Promise<string> => {
  const entries = Object.entries(subcommands);
  return prettify<Action>('actions', entries, [
    subcommand => cyan(subcommand),
    (_, { description = '' }) => description,
  ]);
};

export const options = async (flags: Options): Promise<string> => {
  const entries = Object.entries(flags);
  return prettify<Option>('options', entries, [
    (flag, { alias = '' }) => blue(aliases(flag, alias)),
    (_, { description = '' }) => description,
    (_, { choices = [], default: initial }) => gray(values(choices, initial)),
  ]);
};
