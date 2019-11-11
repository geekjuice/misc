import { Command, Name } from '../../command';
import Default from './default';
import Cow from './cow';
import Yeoman from './yeoman';

const name = Name(__filename);

const todos = ['add other speakers'];

const options = {
  type: {
    alias: 't',
    description: 'choose type',
    choices: ['cow', 'yeoman'],
    default: 'yeoman',
    type: 'string',
  },
};

const actions = {
  default: Default,
  cow: Cow,
  yeoman: Yeoman,
};

export default Command({
  name,
  description: 'moment of zen',
  alias: 'z',
  actions,
  options,
  todos,
});
