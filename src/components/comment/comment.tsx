import { CommentType } from '../../pages/book/feedback/feedback';
import { UserBlock } from '../../pages/book/feedback/user-block/user-block';
import { Rating } from '../../ui/rating/rating';
import { BodyTypography } from '../../ui/typography';

import style from './comment.module.css';

type Props = {
  comment: CommentType;
};

export const Comment = ({ comment }: Props) => (
  <div className={style.container}>
    <div className={style.userBlock}>
      <UserBlock
        fullName={`${comment.user.firstName} ${comment.user.lastName}`}
        avatar={comment.user.avatarUrl}
        dataOfCreation={comment.createdAt}
      />
    </div>
    <Rating rating={comment.rating} />
    <BodyTypography className={style.content} type='large'>
      {comment.text}
    </BodyTypography>
  </div>
);
