import React, {PropTypes as P} from 'react'; // React和ProTypes
import reactMixin  from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './star.styl';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    let result = [];
    let score = Math.floor(this.props.score * 2) / 2;
    let hasDecimal = score % 1 !== 0;
    let integer = Math.floor(score);
    for (var i = 0; i < integer; i++) {
      result.push(CLS_ON);
    };
    if (hasDecimal) {
      result.push(CLS_HALF);
    };
    while (result.length < LENGTH) {
      result.push(CLS_OFF);
    };
      return (
      <div className={"star "+"star-"+this.props.size}>
        {
          result.map((itemClass,index) => {
            return (
              <span className={"star-item "+itemClass} key={index}></span>
            )
          })
        }
      </div>
    );
  }
}

/* 代码类型检查 */
Star.propTypes = {
  children: P.any
};
reactMixin.onClass(Star, PureRenderMixin);
export default Star;
