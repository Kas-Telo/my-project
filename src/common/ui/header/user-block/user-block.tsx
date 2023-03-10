import { Subtitle } from '../../../../ui/typography';

import style from './user-block.module.css';

export const UserBlock = () => (
  <div className={style.container}>
    <Subtitle type='small'>Привет, Александр!</Subtitle>
    <img
      className={style.avatar}
      src='https://bigpicture.ru/wp-content/uploads/2015/11/nophotoshop29-800x532.jpg'
      alt='small-circle-avatar'
    />
  </div>
);
