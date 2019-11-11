import chalk from 'chalk';
import { print, tabular } from './print';

const { gray, magenta } = chalk;

export const key = 'todo';

export const action = (name: string, todos: string[]): void => {
  print(`${magenta('❯')} ${gray(`${name} todo list`)}`);
  if (todos.length === 0) {
    print(gray('nothing to do...'));
  } else {
    tabular(
      todos.map(todo => [todo]),
      { indexed: true }
    );
  }
};
