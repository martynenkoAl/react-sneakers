import { useContext } from 'react';
import Card from '../components/Card';
import AppContext from '../context';

export default function Favourites({ onAddToFavourite }) {
  const { favouriteItems } = useContext(AppContext);
  return (
    <div className='content'>
      <h1>Мои закладки</h1>
      <div className='mt-40 content__container'>
        {favouriteItems.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            price={card.price}
            img={card.img}
            id={card.id}
            addToFavourite={(obj) => onAddToFavourite(obj)}
            favouriteItems={favouriteItems}
            liked={true}
          />
        ))}
      </div>
    </div>
  );
}
