import React, {PropTypes as P} from 'react'; // React和ProTypes
import {connect} from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import Animate from 'rc-animate';
import Header from './header/Header';
import {Link, Route} from 'react-router-dom';
import Goods from './goods/Goods';
import Seller from './seller/Seller';
import Ratings from './ratings/Ratings';
import './app.styl';
import cFetch from '../utils/cFetch';
/* 需要挂载到redux上的参数 */
const mapStoreStateToProps = (state) => ({dispatch: state.dispatch});

/* 创建组件 */

const ActiveLink = ({ label, to }) => (
  <Route path={to} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: ''
    }
  }

  setProps(value) {
    this.setState({
      seller: value
    });
  }

  componentWillMount() {
    cFetch('seller').then((data) => {
      this.setState({'seller': data.jsonResult});
    });
  }

  render() {
    // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
    return (
      <div className="app">
        <Header hello="hello22"/>
        <div className="tag border-1px">
          <div className="tabItem">
            <ActiveLink to="/goods" label="商品"/>
          </div>
          <div className="tabItem">
            <ActiveLink to="/ratings" label="评价"/>
          </div>
          <div className="tabItem">
            <ActiveLink to="/seller" label="商家"/>
          </div>
        </div>
        <Route path="/goods" component={Goods} />
        <Route path="/seller" component={Seller}/>
        <Route path="/ratings" component={Ratings}/>
      </div>
    );
  }
}

/* 代码类型检查 */
App.propTypes = {
  dispatch: P.func,
  children: P.any
};

export default connect(mapStoreStateToProps)(App);
