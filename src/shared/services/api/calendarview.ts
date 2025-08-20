import { httpRequest } from '../network';
import { path } from './routes';

export async function fetchUserEvents<T = unknown>(): Promise<T> {
  const data = await httpRequest.get<any>(path.getUserEvents, { params: { meta: false } });
  return data;

}
