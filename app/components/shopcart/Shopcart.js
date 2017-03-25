import React, { PropTypes as P } from 'react'; // React和ProTypes
import { connect } from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import reactMixin  from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cFetch from '../../utils/cFetch';
import Animate from 'rc-animate';
import BScroll from 'better-scroll';
import './shopcart.styl';
import Cartcontrol from '../../components/cartcontrol/Cartcontrol'

class Shopcart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      show: false
    };
    this.totalCount = 0;
    this.totalPrice = 0;
    this.selectFood = [];
    this.diff = '';
  }

  toggleList() {
    if (!this.totalCount) {
      return
    }
    this.setState({show: !this.state.show});
  }
  hideList() {
    this.setState({show: false});
  }

  empty() {
    this.setState({
      show: false
    })
    this.props.emptyCount();
  }

  componentDidMount() {
    cFetch('seller').then((data) => {
      this.setState({'seller': data.jsonResult});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.selectFood = [];
    this.totalCount = 0;
    this.totalPrice = 0;
    this.diff = '';
    nextProps.goods.map( (good,_index) => {
      good.get('foods').map((food,index) => {
        if (food.get('count')) {
          this.totalCount += food.get('count');
          this.totalPrice += food.get('price') * food.get('count');
        }
      });
    });
    if (this.totalPrice === 0) {
        this.diff = `￥${this.state.seller.minPrice}元起送`;
      }else if(this.totalPrice<this.state.seller.minPrice){
        let diff = this.state.seller.minPrice - this.totalPrice;
        this.diff = `还差￥${diff}元起送`;
      }else{
        this.diff = '去结算';
      }
  }
  componentDidUpdate() {
    window.setTimeout( () => {
      if (!this.scroll && this.refs['list-content']) {
        this.scroll = new BScroll(this.refs['list-content'],{
          click: true
        });
      }else if(this.scroll){
        this.scroll.refresh();
      }
    },0);
  }

  render() {
    return (
      <div>
        <div className="shopcart">
          <div className="content" onClick={this.toggleList.bind(this)}>
            <div className="content-left">
              <div className="logo-wrapper">
                <div className={this.totalCount>0?'logo highlight':'logo'}>
                  <i className={this.totalCount>0?'icon-shopping_cart highlight':'icon-shopping_cart'}></i>
                </div>
                <div className="num" style={{display: this.totalCount > 0?"":"none"}}>
                  {this.totalCount}
                </div>
              </div>
              <div className={this.totalCount>0?'price highlight':'price'}>
                {this.totalPrice}元
              </div>
              <div className="desc">
                另需配送费￥{this.state.seller.deliveryPrice}元
              </div>
            </div>
            <div className="content-right">
              <div className={this.totalPrice < this.state.seller.minPrice?"pay not-enough":"pay enough"}>
                {this.diff}
              </div>
            </div>
          </div>
          <Animate transitionName="fold" showProp='data-show'>
          <div className={this.state.show&&this.totalCount?"shopcart-list show":"shopcart-list"} key="1" data-show={this.state.show&&this.totalCount}
            >
            <div className="list-header">
              <h1 className="title">购物车</h1>
              <span className="empty" onClick={this.empty.bind(this)}>清空</span>
            </div>
            <div className="list-content" ref="list-content">
              <ul>
                {
                  this.props.goods.map((good,_index) => {
                    return(
                      good.get('foods').map((food,index) => {
                        if (food.get('count')) {
                          return(
                            <li className="food border-1px">
                              <span className="name">{food.get('name')}</span>
                              <div className="price">
                                <span>￥{food.get('price')*food.get('count')}</span>
                              </div>
                              <div className="cartcontrol-wrapper">
                                <Cartcontrol food={food} decreaseCount={this.props.decreaseCount.bind(this,_index,index)} addCount={this.props.addCount.bind(this,_index,index)}></Cartcontrol>
                              </div>
                            </li>
                          )
                        }
                      })
                    )
                  })
                }
              </ul>
            </div>
          </div>
          </Animate>
        </div>
        <Animate transitionName="fade">
        {this.state.show&&this.totalCount?
        <div className="list-mask" onClick={this.hideList.bind(this)} style={{display: this.state.show&&this.totalCount?'':'none'}}>
        </div>:null
        }
        </Animate>

      </div>
    );
  }
}

/* 代码类型检查 */
Shopcart.propTypes = {
  dispatch: P.func,
  children: P.any,
};
reactMixin.onClass(Shopcart, PureRenderMixin)
export default Shopcart
