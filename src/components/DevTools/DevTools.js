/**
 * state查看工具
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-06 22:56:22
 * @version 1.0.0
 */
import React from 'react'

//从redux-devtools中引入createDevTools
import { createDevTools } from 'redux-devtools';

//显示包是单独的，要额外指定
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//创建DevTools组件
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
  changePositionKey  ='ctrl-q'>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools
