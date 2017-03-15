import React, { PropTypes as P } from 'react'; // React和ProTypes
import cFetch from '../../utils/cFetch';
import BScroll from 'better-scroll';
import './ratings.styl';
import Star from '../../components/star/Star';
import Split from '../../components/split/Split';
import Ratingselect from '../../components/ratingselect/Ratingselect';
import {formatDate} from '../../common/js/date';

const ALL = 2;

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      ratings: [],
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    }
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
    cFetch('seller').then((data) => {
      this.setState({'seller': data.jsonResult});
    });
    cFetch('ratings').then((data) => {
      this.setState({'ratings': data.jsonResult});
    });
  }
  componentDidUpdate() {
    window.setTimeout( () => {
      if (!this.scroll && this.refs['ratings']) {
        this.scroll = new BScroll(this.refs['ratings'],{
          click: true
        });
      }else if(this.scroll){
        this.scroll.refresh();
      }
    },0);
  }
  render() {
    return (
      <div className="ratings" ref="ratings">
        <div className="ratings-content">
          <div className="overview">
            <div className="overview-left">
              <h1 className="score">{this.state.seller.score}</h1>
              <div className="title">
                综合评分
              </div>
              <div className="rank">
                高于周边商家{this.state.seller.rankRate}%
              </div>
            </div>
            <div className="overview-right">
              <div className="score-wrapper">
                <span className="title">服务态度</span>
                <Star size="36" score={this.state.seller.serviceScore} />
                <span className="score">{this.state.seller.serviceScore}</span>
              </div>
              <div className="score-wrapper">
                <span className="title">商品评分</span>
                <Star size="36" score={this.state.seller.foodScore} />
                <span className="score">{this.state.seller.foodScore}</span>
              </div>
              <div className="delivery-wrapper">
                <span className="title">送达时间</span>
                <span className="delivery">{this.state.seller.deliveryTime}分钟</span>
              </div>
            </div>
          </div>
          <Split />
          <Ratingselect
            toggleContent={this.toggleContent.bind(this)}
            select={this.select.bind(this)}
            selectType={this.state.selectType}
            onlyContent={this.state.onlyContent}
            desc={this.state.desc}
            ratings={this.state.ratings}/>
            <div className="rating-wrapper border-1px">
              <ul>
                {
                  this.state.ratings.map((rating,index) => {
                    if (this.state.onlyContent && !rating.text) {
                      return false
                    }
                    if(this.state.selectType === ALL) {
                      return (
                        <li key={index} className="rating-item">
                          <div className="avatar">
                            <img width="28" height="28" src={rating.avatar} alt="" />
                          </div>
                          <div className="content">
                            <h1 className="name">{rating.username}</h1>
                            <div className="star-wrapper">
                              <Star size="24" score={rating.score} />
                              <span className="delivery" style={{display: rating.deliveryTime?'':'none'}}>
                                {rating.deliveryTime}
                              </span>
                            </div>
                            <p className="text">{rating.text}</p>
                            <div className="recommend" style={{display: rating.recommend && rating.recommend.length?'':'none'}}>
                              <span className="icon-thumb_up"></span>
                              {
                                rating.recommend.map((item,index) => {
                                  return (
                                    <span className="item" key={index}>{item}</span>
                                  )
                                })
                              }
                            </div>
                            <div className="time">
                              {formatDate(rating.rateTime,'yyyy-MM-dd hh:mm')}
                            </div>
                          </div>
                        </li>
                      )
                    }else if(rating.rateType === this.state.selectType){
                      return (
                        <li key={index} className="rating-item">
                          <div className="avatar">
                            <img width="28" height="28" src={rating.avatar} alt="" />
                          </div>
                          <div className="content">
                            <h1 className="name">{rating.username}</h1>
                            <div className="star-wrapper">
                              <Star size="24" score={rating.score} />
                              <span className="delivery" style={{display: rating.deliveryTime?'':'none'}}>
                                {rating.deliveryTime}
                              </span>
                            </div>
                            <p className="text">{rating.text}</p>
                            <div className="recommend" style={{display: rating.recommend && rating.recommend.length?'':'none'}}>
                              <span className="icon-thumb_up"></span>
                              {
                                rating.recommend.map((item,index) => {
                                  return (
                                    <span key={index} className="item">{item}</span>
                                  )
                                })
                              }
                            </div>
                            <div className="time">
                              {formatDate(rating.rateTime,'yyyy-MM-dd hh:mm')}
                            </div>
                          </div>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </div>
        </div>
      </div>
    );
  }
}

/* 代码类型检查 */
Ratings.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default Ratings
