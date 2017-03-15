import { createStore, applyMiddleware,compose } from 'redux';
import ReduxThunk from 'redux-thunk';   // 中间件，有了这个就可以支持异步action
import createLogger from 'redux-logger';
import React, { PropTypes as P } from 'react';
import indexReducer from '../reducer/indexReducer'; // 所有的reducer
import {
    devTools, persistState,createDevTools
} from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
    <DockMonitor
        defaultIsVisible={false}
        toggleVisibilityKey= 'ctrl-q'
        changePositionKey= 'ctrl-m'>
    <LogMonitor theme='solarized'/>

    </DockMonitor>
);

const logger = createLogger();
// 创建store
const store = createStore(indexReducer, applyMiddleware(ReduxThunk,logger));

var finalCreateStore = compose(
    DevTools.instrument()
)(createStore);

export default store;
