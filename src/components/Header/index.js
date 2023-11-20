import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useContext } from 'react';
import AppContext from '../../context';

export default function Header({ handleOpenCart }) {
  const { cartItems } = useContext(AppContext);

  const totalCost = cartItems.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to='/'>
        <div className='d-flex align-center'>
          {' '}
          <img
            className='mr-15'
            width={40}
            height={40}
            src='images/logo.png'
            alt='Логотип сайта'
          />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex align-center'>
        <li className='mr-30' onClick={handleOpenCart}>
          <img
            className='mr-10'
            width={18}
            height={18}
            src='images/cart.svg'
            alt='Корзина покупок'
          />
          <span className={styles.headerPrice}>{totalCost} руб.</span>
        </li>
        <Link to={'/favourites'}>
          <li className='mr-30'>
            <img
              className='mr-10'
              width={18}
              height={18}
              src='images/bookmarks.svg'
              alt='Закладки'
            />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to={'/orders'}>
          <li className='mr-30'>
            <img
              className='mr-10'
              width={18}
              height={18}
              src='images/profile.svg'
              alt='Профиль'
            />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
}
