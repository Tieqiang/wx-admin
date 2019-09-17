import React from 'react' ;
import { connect } from 'dva';
import ProductInfo from './ProductInfo';

const Product = ({ dispatch, product }) => {

  function changeName(){
    dispatch({
      type: 'product/delete',
      payload: '你好',
    });
  }

  return (
    <div>
      <h1>hello ,{product.currentUser}</h1>
      <h1>{JSON.stringify(product)}</h1>
      <ProductInfo products={product}/>
      <button onClick={()=>{
        changeName()
      }}>修改用户</button>
    </div>
  );
};

export default connect(({ product }) => ({
  product
}))(Product);
