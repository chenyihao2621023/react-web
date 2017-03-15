import React, {PropTypes as P} from 'react'; // React和ProTypes
import reactMixin  from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Star from '../../components/star/Star';
import Line from '../../components/line/Line';
import cFetch from '../../utils/cFetch';
import './header.styl';
import Animate from 'rc-animate';

/* 创建组件 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      detailShow: false,
      hello: this.props.hello,
    }
  }

  showDetail() {
    this.setState({
      detailShow: true
    });
  }

  hideDetail() {
    this.setState({
      detailShow: false
    });
  }

  componentWillMount() {
    cFetch('seller').then((data) => {
      this.setState({'seller': data.jsonResult});
    });
  }

  render() {
    // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
    let support,supportCount,supports;
    let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    if (this.state.seller.supports) {
      support = (
        <div className="support">
          <span className={'icon '+classMap[this.state.seller.supports?this.state.seller.supports[0].type: 0]}></span>
          <span className="text">{this.state.seller.supports[0].description}</span>
        </div>
      );
      supportCount = (
        <div className="support-count" onClick={this.showDetail.bind(this)}>
          <span className="count">{this.state.seller.supports.length}个</span>
          <i className="icon-keyboard_arrow_right"></i>
        </div>
      );
      supports = (
        <ul className="supports">
          {
            this.state.seller.supports.map((item,index) => {
              return (
                <li className="support-item" key={index}>
                  <span className={"icon "+classMap[this.state.seller.supports[index].type]}>
                  </span>
                  <span className="text">{this.state.seller.supports[index].description}</span>
                </li>
              )
            })
          }
        </ul>
      );
    }
    return (
      <div className="header">
        <div className="content-wrapper">
          <div className="avatar">
            <img src={this.state.seller?this.state.seller.avatar: ''} width="64" height="64" alt=""/>
          </div>
          <div className="content">
            <div className="title">
              <span className="brand"></span>
              <span className="name">{
                  this.state.seller.name
                }</span>
            </div>
            <div className="description">
              {
                this.state.seller.description
              }/{
                this.state.seller.deliveryTime
              }分钟送达
            </div>
            { support }
          </div>
          {supportCount}
        </div>
        <div className="bulletin-wrapper">
          <span className="bulletin-title"></span><span className="bulletin-text">{this.state.seller.bulletin}</span>
          <i className="icon-keyboard_arrow_right"></i>
        </div>
        <div className="background">
          <img src={this.state.seller.avatar} width="100%" height="100%" alt=""/>
        </div>
        <Animate transitionName="fade" showProp='data-detailShow'>
          {
          this.state.detailShow?<div className="detail" data-detailShow={this.state.detailShow} key="1" style={{display:this.state.detailShow?'block':'none'}}>
            <div className="detail-wrapper clearfix">
              <div className="detail-main">
                <h1 className="name">{this.state.seller.name}</h1>
                <div className="star-wrapper">
                  <Star size="48" score={this.state.seller.score}/>
                </div>
                <Line content="优惠信息"/>
                {supports}
                <Line content="商家公告"/>
                <div className="bulletin">
                  <p className="content">{this.state.seller.bulletin}</p>
                </div>
              </div>
            </div>
            <div className="detail-close" onClick={this.hideDetail.bind(this)}>
              <i className="icon-close"></i>
            </div>
          </div>: null
          }
        </Animate>
      </div>
    );
  }
}/* 代码类型检查 */
reactMixin.onClass(Header, PureRenderMixin);
export default Header
