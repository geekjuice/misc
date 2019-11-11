import got from 'got';

const url = 'https://api.github.com/zen';

export default async (): Promise<string> => {
  const { body } = await got.get(url);
  return body;
};
