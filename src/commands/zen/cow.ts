import cowsay from 'cowsay';
import { Action } from '../../command';
import zen from './zen';

export const cow = (text: string): string => cowsay.say({ text });

export default Action(
  'ask cow for guidance',
  async (): Promise<void> => console.log(cow(await zen()))
);
