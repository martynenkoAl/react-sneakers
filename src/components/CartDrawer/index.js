import AppContext from '../../context';
import CartItem from '../CartItem';
import Info from '../Info';
import styles from './CartDrawer.module.scss';
import { useContext, useState } from 'react';
import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function CartDrawer({ handleCloseCart, deleteItem, opened }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const totalCost = cartItems.reduce((acc, cur) => acc + cur.price, 0);
  const tax = Math.round(totalCost * 0.05);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(
        'https://65561cac84b36e3a431f11b6.mockapi.io/orders',
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrdered(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://6552195d5c69a7790329859a.mockapi.io/cart/${item.id}`
        );
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при оформлении заказа');
    }
  };

  return (
    <div className={`${styles.drawer} ${opened ? styles.drawerVisible : ''}`}>
      <div className={styles.container}>
        <div>
          <h2>
            Корзина{' '}
            <img
              onClick={handleCloseCart}
              className={styles.removeBtn}
              width={32}
              height={32}
              src='images/remove.svg'
              alt='Закрыть'
            />
          </h2>
        </div>
        {cartItems.length === 0 && (
          <Info
            title={isOrdered ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrdered
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrdered ? 'images/ordered.png' : 'images/empty.png'}
          />
        )}
        {cartItems.length !== 0 && (
          <div className={styles.cartList}>
            {cartItems.map((el) => {
              return <CartItem key={el.id} deleteItem={deleteItem} {...el} />;
            })}
          </div>
        )}
        {cartItems.length !== 0 && (
          <div className={styles.costInfo}>
            <ul>
              <li className='d-flex'>
                <span>Итого:</span>
                <div></div>
                <b>{totalCost} руб.</b>
              </li>
              <li className='d-flex'>
                <span>Налог 5%:</span>
                <div></div>
                <b>{tax} руб.</b>
              </li>
            </ul>
            <button onClick={onClickOrder} className={styles.greenButton}>
              Оформить заказ{' '}
              <img
                src='images/arrow.svg'
                alt='Оформить заказ'
                width={14}
                height={12}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
