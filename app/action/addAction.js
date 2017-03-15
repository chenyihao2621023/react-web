export default class AdviserActions {
  // 用户点击按钮时，将触发此方法2
  static onTestAdd(num) {
    return { // 这个return,实际上是触发了action,redux会自动去触发reducer中对应的方法
      type: 'TEST::add', // 与reducer中的type对应
      payload: num + 3
    };
  }
}
