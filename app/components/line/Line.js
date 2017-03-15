import React, {PropTypes as P} from 'react'; // React和ProTypes
import reactMixin  from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './line.styl';

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
      return (
      <div className='title-line'>
        <div className="line">
        </div>
        <div className="text">
        {this.props.content}
        </div>
        <div className="line">
        </div>
      </div>
    );
  }
}

/* 代码类型检查 */
Line.propTypes = {
  children: P.any
};
reactMixin.onClass(Line, PureRenderMixin);
export default Line;
