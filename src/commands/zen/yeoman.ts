import yosay from 'yosay';
import { Action } from '../../command';
import zen from './zen';

export const yeoman = (text: string): string => yosay(text);

export default Action(
  'ask yeoman for guidance',
  async (): Promise<void> => console.log(yeoman(await zen()))
);
