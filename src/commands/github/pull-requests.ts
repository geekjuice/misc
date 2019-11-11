import chalk from 'chalk';
import open from 'open';
import { format, parseISO } from 'date-fns';
import { Action } from '../../command';
import { print, tabular } from '../../print';
import { Parameters } from '../../types';
import client from './client';

const { cyan, gray, green, magenta, red, yellow } = chalk;

type Mergeable = 'MERGEABLE' | 'CONFLICTING' | 'UNKNOWN';

interface PullRequest {
  title: string;
  number: number;
  url: string;
  mergeable: Mergeable;
  createdAt: string;
  repository: {
    nameWithOwner: string;
  };
}

interface Response {
  user: {
    pullRequests: {
      nodes: PullRequest[];
      totalCount: number;
    };
  };
}

const icon = {
  MERGEABLE: green('✔'),
  CONFLICTING: red('×'),
  UNKNOWN: yellow('○'),
};

const query = /* GraphQL */ `
  query PullRequests(
    $user: String = "geekjuice"
    $limit: Int = 10
    $state: [PullRequestState!] = OPEN
  ) {
    user(login: $user) {
      pullRequests(
        first: $limit
        states: $state
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          title
          number
          url
          mergeable
          createdAt
          repository {
            nameWithOwner
          }
        }
        totalCount
      }
    }
  }
`;

const line = ({
  number,
  title,
  mergeable,
  createdAt,
  repository: { nameWithOwner },
}: PullRequest): string[] => [
  gray(`[${nameWithOwner}#${number}]`),
  `${title} ${icon[mergeable]}`,
  cyan(format(parseISO(createdAt), 'P')),
];

export default Action(
  'list pull-requests',
  async ({ open: index, ...rest }: Parameters): Promise<void> => {
    const {
      user: {
        pullRequests: { nodes: prs, totalCount },
      },
    } = await client<Response>({ query, ...rest });

    if (typeof index === 'number') {
      const { url } = prs[index] || {};
      if (!url) {
        print(gray('nothing to open...'));
      } else {
        print(`${magenta('❯')} opening ${gray(`[${url}]`)}`);
        await open(url);
      }
    } else {
      if (totalCount === 0) {
        print(gray('no pull requests...'));
      } else {
        tabular(prs.map(line), { align: ['r'], indexed: true });
      }
    }
  }
);
