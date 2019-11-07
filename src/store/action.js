const action = {
  addCart(context, payload) {
    return new Promise((resolve, refuse) => {
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      if (oldProduct) {
        //存在该数据， 将数量加一
        context.commit("incrementCount", payload);
        resolve("商品数量 +1")
      } else {
        //不存在该数据， 添加到购物车
        payload.count = 1;
        context.commit("addToCart", payload);
        resolve("添加到购物车")
      }
    });
  }
};
export default action;
