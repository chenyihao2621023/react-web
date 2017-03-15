import React, { PropTypes as P } from 'react'; // React和ProTypes
import './split.styl';

class Split extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
    return (
      <div className="split">

      </div>
    );
  }
}

/* 代码类型检查 */
Split.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default Split
