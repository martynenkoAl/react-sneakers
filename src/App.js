import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import NotFound from './pages/NotFound/NotFound';
import Orders from './pages/Orders';
import axios from 'axios';
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isCartOpened, setIsCartOpened] = useState(false);

  const onAddToCart = async (newItem) => {
    console.log(newItem);
    try {
      const findItem = cartItems.find(
        (el) => Number(el.parentId) === Number(newItem.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((el) => Number(el.parentId) !== Number(newItem.id))
        );
        axios.delete(
          `https://6552195d5c69a7790329859a.mockapi.io/cart/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          'https://6552195d5c69a7790329859a.mockapi.io/cart',
          newItem
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину');
      console.error(error);
    }
  };

  const onAddToFavourite = async (newItem) => {
    try {
      if (favouriteItems.find((el) => Number(el.id) === Number(newItem.id))) {
        setFavouriteItems(
          favouriteItems.filter((el) => Number(el.id) !== Number(newItem.id))
        );
        axios.delete(
          `https://65561cac84b36e3a431f11b6.mockapi.io/favourites/${newItem.id}`
        );
      } else {
        const { data } = await axios.post(
          'https://65561cac84b36e3a431f11b6.mockapi.io/favourites',
          newItem
        );
        // console.log(data);
        setFavouriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const deleteItem = (id) => {
    try {
      setCartItems(cartItems.filter((el) => Number(el.id) !== Number(id)));
      axios.delete(`https://6552195d5c69a7790329859a.mockapi.io/cart/${id}`);
    } catch (err) {
      alert('Ошибка при удалении');
      console.error(err);
    }
  };

  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isAddedItem = (id) => {
    return cartItems.some((el) => Number(el.parentId) === Number(id));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartRes, favRes, itemsRes] = await Promise.all([
          axios.get('https://6552195d5c69a7790329859a.mockapi.io/cart'),
          axios.get('https://65561cac84b36e3a431f11b6.mockapi.io/favourites'),
          axios.get('https://6552195d5c69a7790329859a.mockapi.io/items'),
        ]);

        setCartItems(cartRes.data);
        setFavouriteItems(favRes.data);
        setItems(itemsRes.data);
      } catch (err) {
        alert('Ошибка при запросе данных');
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favouriteItems,
        items,
        isAddedItem,
        setIsCartOpened,
        setCartItems,
      }}
    >
      <div className='wrapper clear'>
        <CartDrawer
          cartItems={cartItems}
          handleCloseCart={() => setIsCartOpened(false)}
          deleteItem={deleteItem}
          opened={isCartOpened}
        />
        <Header handleOpenCart={() => setIsCartOpened(true)} />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                searchValue={searchValue}
                onChangeInput={onChangeInput}
                cartItems={cartItems}
                favouriteItems={favouriteItems}
                onAddToCart={onAddToCart}
                onAddToFavourite={onAddToFavourite}
                items={items}
              />
            }
          />
          <Route
            path='/favourites'
            element={<Favourites onAddToFavourite={onAddToFavourite} />}
          />
          <Route
            path='/orders'
            element={<Orders onAddToFavourite={onAddToFavourite} />}
          />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
