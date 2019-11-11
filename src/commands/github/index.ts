import { Command, Name } from '../../command';
import PullRequests from './pull-requests';

const name = Name(__filename);

const todos = ['add caching', 'add pagination'];

const options = {
  user: {
    alias: 'u',
    description: 'github username',
    default: 'geekjuice',
    type: 'string',
  },
  limit: {
    alias: 'l',
    description: 'number of items',
    default: 10,
    type: 'number',
  },
  state: {
    alias: 's',
    description: 'item state',
    choices: ['OPEN', 'MERGED', 'CLOSED'],
    default: 'OPEN',
    type: 'string',
  },
  open: {
    alias: 'o',
    description: 'open item at index',
    type: 'number',
  },
};

const actions = {
  pr: PullRequests,
};

export default Command({
  name,
  description: 'github api',
  alias: 'g',
  actions,
  options,
  todos,
});
