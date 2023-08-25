import React from "react";
import { CommonIcon, ShiftIcon } from './icon';
import './empty.scss';
import { IPublicModelPluginContext } from "@alilc/lowcode-types";

export function Empty(props: {
  pluginContext: IPublicModelPluginContext;
}) {
  return (
    <div className="workspace-empty">
      <div className="workspace-empty-box">
        <div className="workspace-empty-logo">
        <img className="workspace-empty-logo-img" src="https://img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg"></img>
        </div>
      </div>
    </div>
  )
}