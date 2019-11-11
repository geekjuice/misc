import chalk from 'chalk';
import meow from 'meow';
import collect from './collect';
import * as flags from './flags';
import * as list from './list';
import { print } from './print';
import * as Todo from './todo';

const { blue, cyan, magenta, red } = chalk;

const defaults = {
  ...flags.help,
  ...flags.version,
};

(async (): Promise<void> => {
  try {
    const { commands, aliases } = await collect();

    const {
      input: [input],
      flags: { help, version },
      showHelp,
      showVersion,
    } = meow(
      `
      usage: ${magenta('misc')} ${cyan('[command]')} ${blue('[options]')}

      commands:
        ${await list.commands()}

      options:
        ${await list.options(defaults)}`,
      {
        autoHelp: false,
        autoVersion: false,
        flags: flags.sanitize(defaults),
      }
    );

    if (input === Todo.key) {
      const pending = Object.entries(commands).filter(
        ([, { todos = [] }]) => todos.length > 0
      );
      if (pending.length === 0) {
        Todo.action('misc', []);
      } else {
        pending.map(([name, { todos = [] }]) => Todo.action(name, todos));
      }
      process.exit(0);
    }

    if (!(commands?.[input] || aliases?.[input])) {
      if (input) {
        print(red(`${input}?...`));
      } else {
        print(red(`zzz...`));
      }
      showHelp();
    }

    if (!input) {
      if (help) {
        showHelp();
      } else if (version) {
        showVersion();
      }
    }

    const name = aliases?.[input] ?? input;
    const { command } = commands[name];

    await command();

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      print(red(error.message));
    }

    print(red('(╯°□°)╯︵ ┻━┻'));
    process.exit(1);
  }
})();
