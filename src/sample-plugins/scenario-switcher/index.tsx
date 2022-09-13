import React from 'react';
import {
  ILowCodePluginContext,
} from '@alilc/lowcode-engine';
import { Select, Dropdown, Menu } from '@alifd/next';
import scenarios from '../../universal/scenarios.json';
const { Option } = Select;

const getCurrentScenarioName = (): string => {
  const list = location.href.split('/');
  return list[list.length - 1].replace('.html', '') || 'index';
}

const getCurrentScenarioUrl = () => {
  return scenarios.filter(scenario => scenario.name === getCurrentScenarioName())[0]?.urls;
}

function Switcher(props: any) {
  const urls = getCurrentScenarioUrl();
  return (<>
    <Select
      id="basic-demo"
      onChange={(val) => location.href = `./${val}.html`}
      defaultValue={getCurrentScenarioName()}
      style={{ width: 220 }}
    >
      {
        scenarios.map((scenario: any) => <Option value={scenario.name}>{scenario.title}</Option>)
      }
    </Select>
    {
      urls && (
        <Dropdown
          trigger={(
            <img
              style={{
                height: '20px',
                position: 'relative',
                top: '5px',
                marginLeft: '2px',
              }}
              src="https://img.alicdn.com/imgextra/i4/O1CN013upU1R1yl5wVezP8k_!!6000000006618-2-tps-512-512.png"
            />
          )}
          triggerType="click"
        >
          <Menu onItemClick={(key, item) => window.open(key, '_blank')}>
            {
              urls.map((url) => <Menu.Item key={url.value}>{url.key}</Menu.Item>)
            }
          </Menu>
        </Dropdown>
      )
    }
  </>)
}

export const scenarioSwitcher = (ctx: ILowCodePluginContext) => {
  return {
    name: 'scenarioSwitcher',
    async init() {
      const { skeleton } = ctx;

      skeleton.add({
        name: 'scenarioSwitcher',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
          width: 80,
        },
        content: Switcher,
      });
    },
  };
};
scenarioSwitcher.pluginName = 'scenarioSwitcher';