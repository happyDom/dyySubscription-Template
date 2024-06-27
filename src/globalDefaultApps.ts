import { batchImportApps } from '@gkd-kit/tools';

const apps = await batchImportApps(`${import.meta.dirname}/apps`);

// 全局规则的黑名单
// 以下列出的 appID 黑名单，全局规则在这些应用中不可用（为了减少无谓的规则匹配消耗）
export const blackListAppIDs: string[] = [
  'com.tencent.mm', // 微信
  'li.songe.gkd', // GKD
];

// 如果某应用的规则中已有全局规则中的某一类的规则, 则在此应用禁用对应全局规则
function filterAppsByGroup(apps: any[], groupNamePrefix: string): string[] {
  return apps
    .filter(
      (a) =>
        a.groups.filter((g: { name: string }) =>
          g.name.startsWith(groupNamePrefix),
        ).length > 0,
    )
    .map((a) => a.id);
}

// 在应用中单独禁用某个全局规则
// 开屏广告黑名单
export const openAdBlackListAppIDs = new Set([
  ...blackListAppIDs,
  ...filterAppsByGroup(apps, '开屏广告'),
]);

// 更新提示黑名单
export const updateBlackListAppIDs = new Set([
  ...blackListAppIDs,
  ...filterAppsByGroup(apps, '更新提示'),
]);

// 青少年模式黑名单
export const yongBlackListAppIDs = new Set([
  ...blackListAppIDs,
  ...filterAppsByGroup(apps, '青少年模式'),
]);

// 全局规则白名单（由于系统应用默认禁用全局规则，所以对系统应用启用白名单模式）
// 以下列出的 appID 白名单，全局规则在这些应用中可用
export const whiteListAppIDs: string[] = [];

// 在应用中单独启用某个全局规则
// 开屏广告白名单
export const openAdWhiteListAppIDs = new Set([...whiteListAppIDs]);

// 更新提示白名单
export const updateWhiteListAppIDs = new Set([...whiteListAppIDs]);

// 青少年模式白名单
export const yongWhiteListAppIDs = new Set([...whiteListAppIDs]);
