import { httpRequest } from '../network';
import { path } from './routes';

export async function fetchUserEvents<T = unknown>() {
  return httpRequest.get<T>(path.getUserEvents);
}


