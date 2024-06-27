import { defineGkdSubscription } from '@gkd-kit/define';
import categories from './categories';
import globalGroups from './globalGroups';
import { RawApp, RawAppGroup } from '@gkd-kit/api';
import { batchImportApps } from '@gkd-kit/tools';
import { OPEN_AD_ORDER } from './globalGroups';

const apps = await batchImportApps(`${import.meta.dirname}/apps`);
const rawApps: RawApp[] = [];

//所有app规则中的非 开屏广告 类规则， 默认不开启
apps.forEach((appConfig) => {
  appConfig.groups?.forEach((g: RawAppGroup) => {
    if (!g.name.startsWith('开屏广告')) {
      // 如果这不是 开屏广告 类规则
      // 如果你希望app规则中的非 开屏广告 类规则默认不开启，请解除以下代码的注释
      //g.enable = false; //默认不开启该规则
    } else {
      // 如果这是 开屏广告 类规则
      g.order = OPEN_AD_ORDER;
    }
  });
  rawApps.push(appConfig);
});

export default defineGkdSubscription({
  id: 233813,
  name: 'dyySubscription',
  version: 1,
  author: 'dyy',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/happyDom/dyySubscription',
  categories,
  globalGroups,
  apps: rawApps,
});
