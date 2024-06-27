import { RawApp } from '@gkd-kit/api';

interface RawDeprecatedKeysSetting {
  /**
   * 应用ID
   */
  id: string;

  /**
   * 应用名称, 仅用于显示
   */
  name: string;

  /**
   * 废弃的规则key值，所列出的id值，不允许被使用
   */
  deprecatedKeys: number[];
}

export const checkDeprecatedGroupKeys = (apps: RawApp[]) => {
  apps.forEach((a) => {
    appDeprecatedKeys.forEach((d) => {
      if (a.id === d.id) {
        a.groups.forEach((g) => {
          if (d.deprecatedKeys.indexOf(g.key.valueOf()) !== -1) {
            console.error({
              configName: a.name,
              appId: a.id,
              groupName: g.name,
              groupKey: g.key,
            });
            throw new Error('invalid deprecated group key');
          }
        });
      }
    });
  });
};

const appDeprecatedKeys: RawDeprecatedKeysSetting[] = [
  {
    id: 'appID',
    name: 'appIdName',
    deprecatedKeys: [0],
  },
];
