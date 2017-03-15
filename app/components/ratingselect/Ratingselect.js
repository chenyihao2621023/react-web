import React, { PropTypes as P } from 'react'; // React和ProTypes
import './ratingselect.styl'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

class Ratingselect extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    this.positives = this.props.ratings.filter((rating) => {
      return rating.get?rating.get('rateType'):rating.rateType === POSITIVE;
    });
    this.negatives = this.props.ratings.filter( (negative) => {
      return negative.get?negative.get('rateType'):negative.rateType === NEGATIVE;
    });
    return (
      <div className="ratingselect">
        <div className="rating-type border-1px">
          <span onClick={this.props.select.bind(null,2)} className={this.props.selectType===2?"block positive active":"block positive"}>
            {this.props.desc.all}<span className="count">{this.props.ratings.size?this.props.ratings.size:this.props.ratings.length}</span>
          </span>
          <span onClick={this.props.select.bind(null,0)} className={this.props.selectType===0?"block positive active":"block positive"}>{this.props.desc.positive}
            <span className="count">{this.positives.size?this.positives.size:this.positives.length}</span>
          </span>
          <span onClick={this.props.select.bind(null,1)} className={this.props.selectType===1?"block negative active":"block negative"}>{this.props.desc.negative}
            <span className="count">{this.negatives.size?this.negatives.size:this.negatives.length}</span>
          </span>
        </div>
        <div onClick={this.props.toggleContent} className={this.props.onlyContent === true?"switch on":"switch"}>
          <span className="icon-check_circle"></span>
          <span className="text">只看有内容的评价</span>
        </div>

      </div>
    );
  }
}

/* 代码类型检查 */
Ratingselect.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default Ratingselect
