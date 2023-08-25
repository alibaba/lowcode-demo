import React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Dropdown, Menu } from '@alifd/next';
import './index.scss';
export interface IProps {
  logo?: string;
  href?: string;
  scenarioInfo?: any;
  scenarioDisplayName?: string;
}

const Logo: React.FC<IProps> = (props): React.ReactElement => {
  const { scenarioDisplayName, scenarioInfo } = props;
  const urls = scenarioInfo?.urls || [];
  return (
    <div className="lowcode-plugin-logo">
      <a className="logo" target="blank" href={props.href || 'https://lowcode-engine.cn'} style={{ backgroundImage: `url(${props.logo})` }} />
      <div className="scenario-name">{scenarioDisplayName}</div>
      {
      urls && (
        <Dropdown
          className="info-dropdown"
          trigger={(
            <img
              style={{
                height: '18px',
                position: 'relative',
                top: '-2px',
              }}
              src="https://img.alicdn.com/imgextra/i4/O1CN013upU1R1yl5wVezP8k_!!6000000006618-2-tps-512-512.png"
            />
          )}
          triggerType="click"
        >
          <Menu onItemClick={(key, item) => window.open(key, '_blank')}>
            {
              urls.map((url: any) => <Menu.Item key={url.value}>{url.key}</Menu.Item>)
            }
          </Menu>
        </Dropdown>
      )
    }
    </div>
  );
};
// 示例 Logo widget
const LogoSamplePlugin = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    async init() {
      const { skeleton, config } = ctx;
      const scenarioName = options['scenarioName'];
      const scenarioDisplayName = options['displayName'] || scenarioName;
      const scenarioInfo = options['info'] || {};

      // 保存在 config 中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName);
      config.set('scenarioDisplayName', scenarioDisplayName);
      config.set('scenarioInfo', scenarioInfo);

      // 注册 logo widget
      skeleton.add({
        area: 'topArea',
        type: 'Widget',
        name: 'logo',
        content: <Logo scenarioDisplayName={scenarioDisplayName} scenarioInfo={scenarioInfo}  />,
        contentProps: {
          logo: 'https://img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg',
          href: 'https://lowcode-engine.cn',
        },
        props: {
          align: 'left',
        },
      });
    },
  };
}
LogoSamplePlugin.pluginName = 'LogoSamplePlugin';
LogoSamplePlugin.meta = {
  dependencies: [],
  preferenceDeclaration: {
    title: '保存插件配置',
    properties: [
      {
        key: 'scenarioName',
        type: 'string',
        description: '用于localstorage存储key',
      },
      {
        key: 'displayName',
        type: 'string',
        description: '用于显示的场景名',
      },
      {
        key: 'info',
        type: 'object',
        description: '用于扩展信息',
      }
    ],
  },
};
export default LogoSamplePlugin;