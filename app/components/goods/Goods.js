import React, { PropTypes as P } from 'react';
import Immutable from "immutable";
import BScroll from 'better-scroll';
import cFetch from '../../utils/cFetch';
import Animate from 'rc-animate';
import './goods.styl';
import Cartcontrol from '../../components/cartcontrol/Cartcontrol';
import Shopcart from '../../components/shopcart/Shopcart';
import Food from '../../components/food/Food';
/* 创建组件 */
class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [],
      showFood: false,
      goodIndex: 0,
      foodIndex: 0
    };
    this.scrollY = 0;
    this.listHeight = [];
  }

  _initScroll() {
    if (!this.menuScroll) {
          this.menuScroll = new BScroll(this.refs['menu-wrapper'], {
            click: true
          });
        } else {
          this.menuScroll.refresh();
        }
    if (!this.foodsScroll) {
          this.foodsScroll = new BScroll(this.refs['foods-wrapper'], {
            click: true,
            probeType: 3
          });
        } else {
          this.foodsScroll.refresh();
        }
    this.foodsScroll.on('scroll',(pos) => {
      this.scrollY = Math.abs(Math.round(pos.y));
      let current = [];
      if (this.refs['menu-wrapper']) {
        current=this.refs['menu-wrapper'].getElementsByClassName('current');
      }
      for (var i = 0; i < current.length; i++) {
        current[i].className = 'menu-item';
      }
      for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if( !height2 || this.scrollY >= height1 && this.scrollY < height2 ){
            if (this.menuItems) {
              this.menuItems[i].className = 'menu-item current';
            }
            return i
          };
        }
  })
  }
  selectFood(_index,index,e) {
    this.setState({
      showFood: true,
      goodIndex: _index,
      foodIndex: index
    });
  }

  hide() {
    this.setState({
      showFood: false
    })
  }

  addCount(_index,index) {
    let goods = this.state.goods;
    let newGoods;
    if (!goods.getIn([_index,'foods',index,'count'])) {
      newGoods = goods.setIn([_index,'foods',index,'count'],1);
    }else{
      let count = goods.getIn([_index,'foods',index,'count']);
      newGoods = goods.setIn([_index,'foods',index,'count'],count+1);
    }
    this.setState({
      goods: newGoods
    })
  }
  decreaseCount(_index,index) {
    let goods = this.state.goods;
    let newGoods;
    if (goods.getIn([_index,'foods',index,'count'])) {
      let count = goods.getIn([_index,'foods',index,'count']);
      newGoods = goods.setIn([_index,'foods',index,'count'],--count);
    }else {
      return
    }
    this.setState({
      goods: newGoods
    })
  }

  emptyCount() {
    let goods = this.state.goods;
    let newGoods;
    goods = goods.toJS();
    goods.forEach((good,index) => {
      good.foods.forEach((food) => {
        if (food.count) {
          food.count = 0
        }
      })
    });
    newGoods = Immutable.fromJS(goods);
    this.setState({
      goods: newGoods
    })
  }

  selectMenu(index,e) {
      let foodList = this.refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el,300);
    }

  _calculateHeight() {
      let foodList = this.refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight = [];
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
  }

  componentDidMount() {
    cFetch('goods').then((data) => {
      this.setState({'goods': Immutable.fromJS(data.jsonResult)});
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    return !(Immutable.is(Immutable.fromJS(this.props), Immutable.fromJS(nextProps))) ||
           !(Immutable.is(this.state.goods, nextState.goods)) ||
           !(Immutable.is(Immutable.fromJS(this.state.food), Immutable.fromJS(nextState.food))) ||
           !(this.state.showFood === nextState.showFood)
  }

  componentDidUpdate() {
    this._initScroll();
    this._calculateHeight();
    this.menuItems = this.refs['menu-wrapper'].getElementsByClassName('menu-item');
  }

  render() {
    const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    return (
      <div className="goods">
        <div className="menu-wrapper" ref="menu-wrapper">
          <ul>
            {
              this.state.goods.map((item,index) => {
                return(
                  <li className={index === 0?"menu-item current":"menu-item"} key={index} onClick={this.selectMenu.bind(this,index)} ref="menu-item">
                    <span className="text border-1px">
                      <span style={{display: item.type!==-1?'':'none'}} className={"icon " + classMap[item.get('type')]}></span>{item.get('name')}
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="foods-wrapper" ref="foods-wrapper">
          <ul>
            {
              this.state.goods.map( (item,_index) => {
                return (
                  <li key={_index} className="food-list food-list-hook">
                    <h1 className="title">{item.get("name")}</h1>
                    <ul>
                      {
                        item.get('foods').map( (food,index) => {
                          return (
                            <li key={index} onClick={this.selectFood.bind(this,_index,index)} className="food-item border-1px">
                              <div className="icon">
                                <img width="57" height="57" src={food.get('icon')} />
                              </div>
                              <div className="content">
                                <h2 className="name">{food.get('name')}</h2>
                                <p className="desc">{food.get('description')}</p>
                                <div className="extra">
                                  <span className="count">月售{food.get('sellCount')}</span><span>好评率{food.get('rating')}%</span>
                                </div>
                                <div className="price">
                                  <span className="now">￥{food.get('price')}</span><span style={{display: food.get('oldPrice')? "":"none"}} className="old">￥{food.get('oldPrice')}</span>
                                </div>
                                <div className="cartcontrol-wrapper">
                                  <Cartcontrol food={food} decreaseCount={this.decreaseCount.bind(this,_index,index)} addCount={this.addCount.bind(this,_index,index)}></Cartcontrol>
                                </div>
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <Shopcart goods={this.state.goods} emptyCount={this.emptyCount.bind(this)} decreaseCount={this.decreaseCount.bind(this)} addCount={this.addCount.bind(this)}/>
        <Animate transitionName="move">
        {
          this.state.showFood?<Food
          food={this.state.goods.getIn([this.state.goodIndex,'foods',this.state.foodIndex])}
          decreaseCount={this.decreaseCount.bind(this,this.state.goodIndex,this.state.foodIndex)}
          addCount={this.addCount.bind(this,this.state.goodIndex,this.state.foodIndex)}
          addFirst={this.addCount.bind(this,this.state.goodIndex,this.state.foodIndex)}
          hide={this.hide.bind(this)}/>:null
        }
        </Animate>
      </div>
    )
  }
}


Shop.propTypes = {
  dispatch: P.func,
  children: P.any,
};


export default Shop
