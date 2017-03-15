import React, { PropTypes as P } from 'react'; // React和ProTypes
import BScroll from 'better-scroll';
import Star from '../../components/star/Star';
import Split from '../../components/split/Split';
import cFetch from '../../utils/cFetch';
import {saveToLocal, loadFromLocal} from '../../common/js/store';
import './seller.styl';

class Seller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      favorite: false
    }
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }

  togglerFavorite() {
    this.setState({
      favorite: !this.state.favorite
    })
    saveToLocal(this.state.seller.id,'favorite',this.favorite);
  }

  componentDidMount() {
    cFetch('seller').then((data) => {
      this.setState({'seller': data.jsonResult});
    });
  }
  componentDidUpdate() {
    window.setTimeout( () => {
      if (!this.scroll && this.refs['seller']) {
        this.scroll = new BScroll(this.refs['seller'],{
          click: true
        });
      }else if(this.scroll){
        this.scroll.refresh();
      }
      if (this.state.seller.pics) {
      let picWidth = 120;
      let margin = 6;
      let width = (picWidth + margin) * this.state.seller.pics.length - margin;
      this.refs["pic-list"].style.width = width + 'px';
      if (!this.picScroll && this.refs["pic-wrapper"]) {
        this.picScroll = new BScroll(this.refs["pic-wrapper"], {
          scrollX: true,
          eventPassthrough: 'vertical'
        });
      }else{
        this.picScroll.refresh();
      }
    }
    },0);
  }

  render() {
    return (
      <div className="seller" ref="seller">
        <div className="seller-content">
          <div className="overview">
            <h1 className="title">{this.state.seller.name}</h1>
            <div className="desc border-1px">
              <Star size="36" score={this.state.seller.score} />
              <span className="text">({this.state.seller.ratingCount})</span>
              <span className="text">月售{this.state.seller.sellCount}单</span>
            </div>
            <ul className="remark">
              <li className="block">
                <h2>起送价</h2>
                <div className="content">
                  <span className="stress">{this.state.seller.minPrice}</span>元
                </div>
              </li>
              <li className="block">
                <h2>商家配送</h2>
                <div className="content">
                  <span className="stress">{this.state.seller.deliveryPrice}</span>元
                </div>
              </li>
              <li className="block">
                <h2>平均配送时间</h2>
                <div className="content">
                  <span className="stress">{this.state.seller.deliveryTime}</span>分钟
                </div>
              </li>
            </ul>
            <div className="favorite" onClick={this.togglerFavorite.bind(this)}>
              <span className={this.state.favorite?"icon-favorite active":"icon-favorite"}></span>
              <span className="text">{this.state.favorite?'已收藏':'收藏'}</span>
            </div>
          </div>
          <Split />
          <div className="bulletin">
            <h1 className="title">公告与活动</h1>
            <div className="content-wrapper border-1px">
              <p className="content">{this.state.seller.bulletin}</p>
            </div>
            {
              this.state.seller.supports?
              <ul className="supports">
                {
                  this.state.seller.supports.map((item,index) => {
                    return (
                      <li key={index} className="support-item border-1px">
                        <span className={"icon"+" "+this.classMap[this.state.seller.supports[index].type]}>
                        </span>
                        <span className="text">{this.state.seller.supports[index].description}</span>
                      </li>
                    )
                  })
                }
              </ul>:null
            }
          </div>
          <Split />
          <div className="pics">
            <h1 className="title">商家实景</h1>
            <div className="pic-wrapper" ref="pic-wrapper">
              <ul className="pic-list" ref="pic-list">
                {
                  this.state.seller.pics?this.state.seller.pics.map((pic,index) => {
                    return (
                      <li className="pic-item" key={index}>
                        <img src={pic} width="120" height="90" />
                      </li>
                    )
                  }):null
                }
              </ul>
            </div>
          </div>
          <Split />
          <div className="info">
            <h1 className="title border-1px">商家信息</h1>
            <ul>
              {
                this.state.seller.infos?this.state.seller.infos.map((info,index) => {
                  return (
                    <li className="info-item" key={index}>{info}</li>
                  )
                }):null
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/* 代码类型检查 */
Seller.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default Seller
