import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 233813,
  name: 'dyySubscription',
  version: 0,
  author: 'dyy',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/happyDom/dyySubscription',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
