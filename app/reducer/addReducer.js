
const actDefault = (state) => state;
const addReducer = (state = {}, action) => {
  switch (action.type) {
  // 匹配type来执行对应的方法，action中返回对应的type，这里就会执行对应的方法
  case 'ADD':
    const { str } = action;
    return  Object.assign({}, state, {
      value: str,
    });
  default:
    return actDefault(state, action);
  }
};

export default addReducer;
