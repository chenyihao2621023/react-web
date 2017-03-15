import React from 'react';
import ReactDOM from 'react-dom';
import { Route,BrowserRouter  } from 'react-router-dom';
import {Provider} from 'react-redux'; // react和redux连接的桥梁，就是这个Provider
import { Router, browserHistory,Match } from 'react-router'; // 路由组件
import createBrowserHistory from 'history/createBrowserHistory'
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { MemoryRouter } from 'react-router';
import { createStore, applyMiddleware,compose } from 'redux';
import indexReducer from './reducer/indexReducer';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import 'babel-polyfill';
import App from './components/App';
import './common/stylus/index.styl';

const history = createBrowserHistory();
const DevTools = createDevTools(
    <DockMonitor
        defaultIsVisible={false}
        toggleVisibilityKey= 'ctrl-q'
        changePositionKey= 'ctrl-m'>
    <LogMonitor theme='solarized'/>

    </DockMonitor>
);

const logger = createLogger();
const enhancer = compose(
  applyMiddleware(ReduxThunk,logger),
  DevTools.instrument()
);

const store = createStore(indexReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <Route component={App} path='/' />
      </BrowserRouter>
    </div>
  </Provider>,
  document.body.appendChild(document.getElementById('app'))
);
