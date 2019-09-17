const product = {
  namespace: 'product',
  state: { currentUser: 'zhaotq' },
  reducers: {
    delete(state, {payload: id}) {
      let obj = {}
      obj.currentUser = id ;
      return obj;
    }
  },
};

export default product;
