import { basename, dirname } from 'path';
import chalk from 'chalk';
import meow from 'meow';
import * as flags from './flags';
import * as list from './list';
import { create } from './logger';
import { print } from './print';
import * as Todo from './todo';
import * as Types from './types';

const { blue, cyan, gray, magenta, red } = chalk;

const logger = create('command');

interface Options {
  name: string;
  alias?: string;
  description?: string;
  actions?: Types.Actions;
  options?: Types.Options;
  todos?: string[];
}

export const Name = (file: string) => basename(dirname(file));

export const Command = ({
  name,
  alias,
  description,
  actions = {},
  options = {},
  todos = [],
}: Options): Types.Command => ({
  alias,
  description,
  todos,
  command: async () => {
    logger.log(`starting ${name}`);

    const merged = { ...flags.help, ...options };

    const {
      input: [input = 'default'],
      flags: { help, version, ...rest },
      showHelp,
      showVersion,
    } = meow(
      `
      usage: ${magenta(name)} ${cyan('action')} ${blue('[options]')}

      actions:
        ${await list.actions(actions)}

      options:
        ${await list.options(merged)}`,
      {
        argv: process.argv.slice(3),
        autoHelp: false,
        autoVersion: false,
        description: gray(`[${description}]`),
        flags: flags.sanitize(merged),
      }
    );

    if (help) {
      logger.log(`showing ${name} help`);
      showHelp();
    } else if (version) {
      logger.log(`showing ${name} version`);
      showVersion();
    }

    if (input === Todo.key) {
      Todo.action(name, todos);
      process.exit(0);
    }

    if (!actions?.[input]) {
      if (input !== 'default') {
        logger.warn('unknown action provided');
        print(red(`${input}?...`));
      } else {
        logger.warn('no action provided');
        print(red(`zzz...`));
      }
      showHelp();
    }

    await actions[input]?.action(rest);

    logger.log(`exiting ${name}`);
    process.exit(0);
  },
});

export const Action = (
  description: string,
  action: Types.Action['action']
): Types.Action => ({
  description,
  action,
});
