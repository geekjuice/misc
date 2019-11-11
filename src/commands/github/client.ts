import { graphql } from '@octokit/graphql';
import { RequestParameters } from '@octokit/types';
import { GITHUB_ACCESS_TOKEN } from '../../env';

const client = graphql.defaults({
  headers: {
    authorization: `bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

export default async <T>(parameters: RequestParameters) => {
  const data = await client(parameters);
  return data as T;
};
