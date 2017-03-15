import React, { PropTypes as P } from 'react'; // React和ProTypes
import reactMixin  from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Animate from 'rc-animate';
import './cartcontrol.styl'
/* 创建组件 */
class Cartcontrol extends React.Component {
  constructor(props) {
    super(props);
  }

  decreaseCart(e) {
    e.stopPropagation();
    this.props.decreaseCount();
  }

  addCart(e) {
    e.stopPropagation();
    this.props.addCount();
  }

  render() {
    return (
      <div className="cartcontrol">
        <Animate transitionName="move" showProp='data-decreaseShow'>
        {
          this.props.food.get('count')?<div className="cart-decrease" key="1" data-decreaseShow={this.props.food.get('count')} style={{display: this.props.food.get('count')? "":"none"}}  onClick={this.decreaseCart.bind(this)}>
          <div className="inner icon-remove_circle_outline">
          </div>
        </div>:null
        }
      </Animate>
        <div className="cart-count" style={{display: this.props.food.get('count')? "":"none"}}>
          {this.props.food.get('count')}
        </div>
        <div className="cart-add icon-add_circle" onClick={this.addCart.bind(this)}>

        </div>
      </div>
    );
  }
}

/* 代码类型检查 */
Cartcontrol.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default Cartcontrol
