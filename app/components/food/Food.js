import React, { PropTypes as P } from 'react'; // React和ProTypes
import { connect } from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import Animate from 'rc-animate';
import BScroll from 'better-scroll';
import './food.styl';
import Cartcontrol from '../../components/cartcontrol/Cartcontrol';
import Split from '../../components/split/Split';
import Ratingselect from '../../components/ratingselect/Ratingselect';
import {formatDate} from '../../common/js/date';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

class Food extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFlag: true,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  }

  hide() {
    this.props.hide();
  }
  addFirst() {
    this.props.addFirst();
  }

  select(selectType) {
    this.setState({
      selectType: selectType
    });
  }

  toggleContent() {
    this.setState({
      onlyContent: !this.state.onlyContent
    });
  }

  componentDidMount() {
    window.setTimeout(() => {
      if (!this.scroll) {
          this.scroll = new BScroll(this.refs['food'], {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
    },0)
  }

  componentDidUpdate() {
    if (!this.scroll) {
        this.scroll = new BScroll(this.refs['food'], {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
  }

  render() {

    return (
      <div className="food" ref="food">
        <div className="food-content">
          <div className="image-header">
            <img src={this.props.food.get('image')} />
            <div className="back" onClick={this.hide.bind(this)}>
              <i className="icon-arrow_lift"></i>
            </div>
          </div>
          <div className="content">
              <div className="title">
                {this.props.food.get('name')}
              </div>
              <div className="detail">
                <span className="sell-count">月售{this.props.food.get('sellCount')}份</span>
                <span className="rating">好评率</span>
              </div>
              <div className="price">
                <span className="now">￥{this.props.food.get('price')}</span><span style={{display: this.props.food.get('oldPrice')?'':'none'}} className="old">￥{this.props.food.get('oldPrice')}</span>
              </div>
              <div className="cartcontrol-wrapper">
                <Cartcontrol food={this.props.food} decreaseCount={this.props.decreaseCount} addCount={this.props.addCount} />
              </div>
              <Animate transitionName="fade">
              {
              !this.props.food.get('count')?
              <div onClick={this.addFirst.bind(this)} style={{display:this.props.food.get('count')?'none':'' }} className="buy">
                加入购物车
              </div>:null
              }
              </Animate>
            </div>
          <Split />
          <div className="info" style={{display: this.props.food.get('info')?'':'none'}}>
              <h1 className="title">商品信息</h1>
              <div className="text">
                {this.props.food.get('info')}
              </div>
          </div>
          <Split />
          <div className="rating">
            <h1 className="title">商品评价</h1>
            <Ratingselect
              toggleContent={this.toggleContent.bind(this)}
              select={this.select.bind(this)}
              selectType={this.state.selectType}
              onlyContent={this.state.onlyContent}
              desc={this.state.desc}
              ratings={this.props.food.get('ratings')} />
            <div className="rating-wrapper">
              <ul style={{display: this.props.food.get('ratings') && this.props.food.get('ratings').size?'':'none'}}>
                {
                  this.props.food.get('ratings').map((rating,index) => {
                    if (this.state.onlyContent && !rating.get('text')) {
                      return false
                    }
                    if(this.state.selectType === ALL) {
                      return (
                        <li key={index} className="rating-item border-1px">
                          <div className="user">
                            <span className="name">{rating.get('username')}</span>
                            <img src={rating.get('avatar')} className="avatar" width="12" height="12" />
                          </div>
                          <div className="time">
                            {formatDate(rating.get('rateTime'),'yyyy-MM-dd hh:mm')}
                          </div>
                          <p className="text">
                            <span className={rating.get('rateType')===0?'icon-thumb_up':rating.get('rateType')===1?'icon-thumb_down':''}>
                              <span className="rating-text">{rating.get('gettext')}</span>
                            </span>
                          </p>
                        </li>
                      )
                    }else if(rating.get('rateType') === this.state.selectType){
                      return (
                        <li key={index} className="rating-item border-1px">
                          <div className="user">
                            <span className="name">{rating.get('username')}</span>
                            <img src={rating.get('avatar')} className="avatar" width="12" height="12" />
                          </div>
                          <div className="time">
                            {formatDate(rating.get('rateTime'),'yyyy-MM-dd hh:mm')}
                          </div>
                          <p className="text">
                            <span className={rating.get('rateType')===0?'icon-thumb_up':rating.get('rateType')===1?'icon-thumb_down':''}>
                              <span className="rating-text">{rating.get('gettext')}</span>
                            </span>
                          </p>
                        </li>
                      )
                    }
                  })
                }
              </ul>
              <div className="no-rating" style={{display: !this.props.food.get('ratings') || !this.props.food.get('ratings').size?'':'none'}}>
                暂无评价
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* 代码类型检查 */
Food.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default Food
