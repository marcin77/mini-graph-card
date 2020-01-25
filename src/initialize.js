/* eslint-disable no-console */
import localForage from 'localforage/src/localforage';
import { decompress } from './utils';

localForage.config({
  name: 'mini-graph-card',
  version: 1.0,
  storeName: 'entity_history_cache',
  description: 'Mini graph card uses caching for the entity history',
});

localForage.iterate((data, key) => {
  const value = key.endsWith('-raw') ? data : decompress(data);
  const start = new Date();
  start.setHours(start.getHours() - value.hours_to_show);
  if (new Date(value.last_fetched) < start) {
    localForage.removeItem(key);
  }
}).catch((err) => {
  console.warn('Purging has errored: ', err);
});
