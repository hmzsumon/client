import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/cartSlice';
import { fetchProducts, STATUS } from '../../redux/productSlice';
import HomeLayout from '../Home/HomeLayout';

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());

    // const fetchProducts = async () => {
    //   const response = await fetch('https://fakestoreapi.com/products');
    //   const data = await response.json();
    //   console.log(data);
    //   setProducts(data);
    // };

    // fetchProducts();
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  if (status === STATUS.LOADING) {
    return (
      <div className='flex items-center justify-center h-screen text-3xl'>
        Loading...
      </div>
    );
  }

  return (
    <HomeLayout>
      <div className=' flex flex-wrap  justify-between gap-10  m-10  h-auto'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-green-500 flex flex-col w-[200px]  px-10 py-4 items-center justify-center space-x-2 space-y-2 rounded-lg'
          >
            <div className=''>
              <img src={product.image} alt={product.title} className='w-10' />
            </div>
            <p className='text-sm text-center'>{product.title}</p>
            <button
              className=' bg-sky-800 py-2 px-2 rounded-md'
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </HomeLayout>
  );
};

export default Products;
