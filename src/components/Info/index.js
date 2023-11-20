import { useContext } from 'react';
import styles from './Info.module.scss';
import AppContext from '../../context';
export default function Info({ title, description, image }) {
  const { setIsCartOpened } = useContext(AppContext);
  return (
    <div className={styles.emptyCart}>
      <img width={120} height={120} src={image} alt='Корзина пустая' />
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        className={styles.greenButton}
        onClick={() => setIsCartOpened(false)}
      >
        <img
          src='images/back-arrow.svg'
          alt='Вернуться назад'
          width={14}
          height={12}
        />
        Вернуться назад{' '}
      </button>
    </div>
  );
}
