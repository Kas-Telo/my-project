import { useState } from 'react';

import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { Comment } from '../../../components/comment/comment';
import { Icon } from '../../../ui/icon/icon';
import { Subtitle } from '../../../ui/typography';

import style from './feedback.module.css';

export type CommentType = {
  id: number | null;
  rating: number;
  text: string | null;
  createdAt: Date;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
};

type Props = {
  comments: CommentType[] | null;
};

export const Feedback = ({ comments }: Props) => {
  const [isOpenComments, toggleComments] = useState(false);
  const size: Size = useWindowSize();

  const commentsViewClass = `${isOpenComments ? style.contentView : style.contentNotView}`;

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.title}>
          {size.width > 992 ? (
            <h5>Отзывы</h5>
          ) : size.width > 576 ? (
            <Subtitle type='large'>Отзывы</Subtitle>
          ) : (
            <h3>Отзывы</h3>
          )}
          <span className={style.count}>{comments ? comments.length : 0}</span>
        </div>
        <button
          data-test-id='button-hide-reviews'
          type='button'
          className={style.buttonTitle}
          onClick={() => toggleComments(!isOpenComments)}
        >
          <Icon title={isOpenComments ? 'chevron-up' : 'chevron-down'} />
        </button>
      </div>
      {comments && (
        <div className={`${style.contentContainer} ${commentsViewClass}`}>
          <div className={style.hr} />
          <ul className={style.containerList}>
            {comments.map((el) => (
              <li key={el.id}>
                <Comment comment={el} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
