import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.scss';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h3>Страница не найдена</h3>
      <button
        className={styles.greenButton}
        onClick={() => navigate(-1)}
        type='button'
        aria-label='Вернуться на предыдущую страницу'
      >
        Вернуться назад
      </button>
    </div>
  );
}
