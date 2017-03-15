import React, {PropTypes as P} from 'react'; // React和ProTypes
import {connect} from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import './header.styl';
/* 需要挂载到redux上的参数 */
const mapStoreStateToProps = (state) => ({dispatch: state.dispatch});

/* 创建组件 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailShow: false
    }
  }

  showDetail() {
    this.setState({
      detailShow: true
    });
  }

  render() {
    // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
    let support,supportCount;
    let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    if (this.props.seller.supports) {
      support = (
        <div className="support">
          <span className={'icon '+classMap[this.props.seller.supports[0].type]}></span>
          <span className="text">{this.props.seller.supports[0].description}</span>
        </div>
      );
      supportCount = (
        <div className="support-count" onClick={this.showDetail.bind(this)}>
          <span className="count">{this.props.seller.supports.length}个</span>
          <i className="icon-keyboard_arrow_right"></i>
        </div>
      );
    }
    return (
      <div className="header">
        <div className="content-wrapper">
          <div className="avatar">
            <img src={this.props.seller.avatar} width="64" height="64" alt=""/>
          </div>
          <div className="content">
            <div className="title">
              <span className="brand"></span>
              <span className="name">{
                  this.props.seller.name
                }</span>
            </div>
            <div className="description">
              {
                this.props.seller.description
              }/{
                this.props.seller.deliveryTime
              }分钟送达
            </div>
            { support }
          </div>
          {supportCount}
        </div>
        <div className="bulletin-wrapper">
          <span className="bulletin-title"></span><span className="bulletin-text">{this.props.seller.bulletin}</span>
          <i className="icon-keyboard_arrow_right"></i>
        </div>
        <div className="background">
          <img src={this.props.seller.avatar} width="100%" height="100%" alt=""/>
        </div>
      </div>
    );
  }
}/* 代码类型检查 */
export default Header
