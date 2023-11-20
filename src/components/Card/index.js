import { useContext, useState } from 'react';
import styles from './Card.module.scss';
import AppContext from '../../context';

export default function Card({
  name,
  price,
  id,
  img,
  addToCart,
  addToFavourite,
  liked = false,
}) {
  const { isAddedItem } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(liked);
  const obj = { name, price, img, id, parentId: id };

  const handleAdd = () => {
    addToCart(obj);
  };

  const handleLike = () => {
    addToFavourite(obj);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.card}>
      {addToFavourite && (
        <img
          onClick={handleLike}
          className={styles.favourite}
          width={32}
          height={32}
          src={isFavourite ? 'images/saved.svg' : 'images/not-saved.svg'}
          alt='Добавить в закладки'
        />
      )}
      <img width={133} height={112} src={img} alt='Карточка с товаром' />
      <p>{name}</p>
      <div className={styles.cardBottom}>
        <div className={styles.price}>
          <span>ЦЕНА:</span>
          <b>{price} руб.</b>
        </div>
        {addToCart && (
          <img
            className='cu-p'
            width={32}
            height={32}
            src={isAddedItem(id) ? 'images/added.svg' : 'images/plus.svg'}
            alt='Добавить в корзину'
            onClick={handleAdd}
          />
        )}
      </div>
    </div>
  );
}
