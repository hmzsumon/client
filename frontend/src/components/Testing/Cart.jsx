import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../redux/cartSlice';
import HomeLayout from '../Home/HomeLayout';

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeHandler = (id) => {
    dispatch(remove(id));
  };

  return (
    <HomeLayout>
      <div className='h-screen px-10'>
        <h1>Cart Products:</h1>
        <div>
          {products.map((product) => (
            <li
              key={product.id}
              className=' list-none flex gap-4 my-4 items-center '
            >
              <img src={product.image} alt='' className='w-10' />
              <h2>{product.title}</h2>
              <button
                className=' bg-sky-800 py-2 px-2 rounded-md'
                onClick={() => removeHandler(product.id)}
              >
                remove
              </button>
            </li>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Cart;
