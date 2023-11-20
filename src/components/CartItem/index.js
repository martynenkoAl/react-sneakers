import styles from './CartItem.module.scss';

export default function CartItem(props) {
  const { name, img, price, id, deleteItem } = props;
  return (
    <div className={styles.cartItem}>
      <img src={img} alt='Карточка с товаром' width={70} height={70} />
      <div className={styles.descriptionBlock}>
        <p>{name}</p>
        <b>{price} руб.</b>
      </div>
      <img
        onClick={() => deleteItem(id)}
        className={styles.removeBtn}
        width={32}
        height={32}
        src='/images/remove.svg'
        alt='Удалить из корзины'
      />
    </div>
  );
}
