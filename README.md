## Low-Code Engine Demo
demo 是一个组合内核、setter、插件、物料的示范工程，因为未经长期生产环境打磨，可能还会有一些各个模块间结合的 bug，希望大家理解~

## 如何使用
目前包含多个独立 demo 工程目录，每个 demo 目录都是一个独立的工程，代表一个特定的 demo 场景，可以选择其一单独使用。

[推荐]使用yarn
```bash
git clone git@github.com:alibaba/lowcode-demo.git
cd lowcode-demo
cd demo-general
yarn
yarn run start
```

使用npm
```bash
git clone git@github.com:alibaba/lowcode-demo.git
cd lowcode-demo
cd demo-general
npm install
npm run start
```

场景列表：

- [general](https://lowcode-engine.cn/demo/demo-general/index.html)：此 demo 尽可能将引擎常用能力展示出来，在试用时建议使用该 demo 工程，其他 demo 均各有侧重展示内容。
- [basic-fusion](https://lowcode-engine.cn/demo/demo-basic-fusion/index.html)：此 fusion 的元数据描述是很老的版本，只为了示意描述结构，请勿用于生产环境
- [basic-antd](https://lowcode-engine.cn/demo/demo-basic-antd/index.html)
- [custom-initialization](https://lowcode-engine.cn/demo/demo-custom-initialization/index.html)
- [node-extended-actions](https://lowcode-engine.cn/demo/demo-node-extended-actions/index.html)
- [next-pro](https://lowcode-engine.cn/demo/demo-next-pro/index.html)
- [antd-pro-with-formily](https://lowcode-engine.cn/demo/demo-antd-pro-with-formily/index.html)
- [lowcode-component](https://lowcode-engine.cn/demo/demo-lowcode-component/index.html)

更多参考资料：

- [马上玩一下](https://lowcode-engine.cn/demo/demo-general/index.html)
- [低代码引擎官网](http://lowcode-engine.cn)
- [引擎主仓库](https://github.com/alibaba/lowcode-engine)
