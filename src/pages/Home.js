import Card from '../components/Card';

export default function Home({
  searchValue,
  onChangeInput,
  items,
  onAddToCart,
  onAddToFavourite,
  cartItems,
  favouriteItems,
}) {
  return (
    <div className='content'>
      <div className='d-flex justify-between'>
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
        </h1>
        <div className='search'>
          <img src='/images/search.svg' alt='Поиск товаров' />
          <input
            type='text'
            value={searchValue}
            onChange={onChangeInput}
            placeholder='Поиск...'
          />
        </div>
      </div>
      <div className='mt-40 content__container'>
        {items
          .filter((el) =>
            el.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((card) => (
            <Card
              key={card.id}
              addToCart={(obj) => onAddToCart(obj)}
              addToFavourite={(obj) => onAddToFavourite(obj)}
              cartItems={cartItems}
              favouriteItems={favouriteItems}
              {...card}
            />
          ))}
      </div>
    </div>
  );
}
