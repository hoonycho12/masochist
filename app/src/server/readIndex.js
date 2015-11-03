/**
 * @flow
 */

import {getClient} from '../common/redis';

export default async function readIndex(
  name: string,
  count: number,
  offset: number
): Array {
  const client = getClient();
  const results = await client.multi([
    [
      'zrevrange',
      name,
      offset,
      offset + count - 1,
    ],
    [
      'zcard',
      name,
    ]
  ]).execAsync();

  // Results is not an array, so we can't destructure it (although we can make
  // it into an array for the benefit of our callers).
  return [results[0], results[1]];
}