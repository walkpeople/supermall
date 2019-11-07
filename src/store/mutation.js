const mutation = {
    //购物车的数量加一
    incrementCount(state, payload) {
      state.cartList.find( item => item.iid === payload.iid).count++;
    },
    //加入购物车
    addToCart(state, payload) {
      state.cartList.push(payload)
    }

}

export default mutation;
