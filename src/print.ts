import chalk from 'chalk';
import table, { Options } from 'text-table';

const { yellow } = chalk;

interface TableParameters {
  align: Options['align'];
  indent: number;
  indexed: boolean;
  spacing: number;
}

export const spaces = (length: number): string =>
  Array.from({ length })
    .map(() => ' ')
    .join('');

export const print = (message: string): void =>
  console.log(`\n${spaces(2)}${message}`);

export const tabular = (
  items: string[][],
  { align, indent = 2, indexed, spacing = 2 }: Partial<TableParameters> = {}
) => {
  const cells = indexed
    ? items.map((list, index) => [yellow(`[${index}]`), ...list])
    : items;
  const lines = table(cells, { align, hsep: spaces(spacing) }).split('\n');
  console.log(['', ...lines].join(`\n${spaces(indent)}`));
};
