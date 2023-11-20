import { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://65561cac84b36e3a431f11b6.mockapi.io/orders'
        );
        setOrders(data.reduce((acc, cur) => [...acc, ...cur.items], []));
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className='content'>
      <h1>Мои заказы</h1>
      <div className='mt-40 content__container'>
        {orders.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            price={card.price}
            img={card.img}
            id={card.id}
          />
        ))}
      </div>
    </div>
  );
}
