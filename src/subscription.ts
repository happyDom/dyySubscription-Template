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
      // 如果这是 开屏广告 类规则，则设置其优先级值
      g.order = OPEN_AD_ORDER;
    }
  });
  rawApps.push(appConfig);
});

export default defineGkdSubscription({
  id: 233813, //一个数字，不与别人的规则订阅id冲突就行
  name: 'dyySubscription', //修改为你的规则订阅名称
  version: 0, //根据规则的发布，这个值需要做更新（增加），当GKD检测到此版本值较新时，会触发规则更新动作
  author: 'dyy', //规则编写者名称
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/happyDom/dyySubscription', //修改为具体的 subscription 项目链接
  categories,
  globalGroups,
  apps: rawApps,
});
