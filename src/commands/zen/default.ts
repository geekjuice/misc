import { Action } from '../../command';
import { Parameters } from '../../types';
import zen from './zen';
import { cow } from './cow';
import { yeoman } from './yeoman';

export default Action(
  'provide a moment of zen',
  async ({ type }: Parameters): Promise<void> => {
    const text = await zen();
    const say = type === 'cow' ? cow : yeoman;
    console.log(say(text));
  }
);
