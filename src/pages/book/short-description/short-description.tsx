import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { ButtonBook } from '../../../components/button-book';
import { BodyTypography, Subtitle } from '../../../ui/typography';

import style from './shord-discription.module.css';

type Props = {
  title: string;
  authors: string[] | null;
  order: boolean;
  handed: boolean;
  dateHandedTo: Date | null;
  description: string | null;
};

export const ShortDescription = ({ title, authors, dateHandedTo, order, handed, description }: Props) => {
  const size: Size = useWindowSize();

  return (
    <div className={style.container}>
      {size.width > 992 ? (
        <div>
          <h3 data-test-id='book-title' className={style.title}>
            {title}
          </h3>
          <h5 className={style.author}>{authors?.join(', ')}</h5>
        </div>
      ) : size.width > 576 ? (
        <div>
          <h4 data-test-id='book-title' className={style.title}>
            {title}
          </h4>
          <Subtitle type='small' className={style.author}>
            {authors?.join(', ')}
          </Subtitle>
        </div>
      ) : (
        <div>
          <h3 data-test-id='book-title' className={style.title}>
            {title}
          </h3>
          <BodyTypography type='small' className={style.author}>
            {authors?.join(', ')}
          </BodyTypography>
        </div>
      )}
      <ButtonBook
        className={style.button}
        dateHandedTo={dateHandedTo}
        order={order}
        handed={handed}
        onClick={() => {}}
        size={size.width > 576 ? 'large' : 'small'}
        sizeTypography={size.width > 576 ? 'large' : 'small'}
        variantTypography={size.width > 576 ? 'mobile' : 'mobile'}
      />
      {size.width > 992 && (
        <div className={style.descriptionBlock}>
          <h5 className={style.descriptionTitle}>О книге</h5>
          <BodyTypography type='large'>{description ? description : '---'}</BodyTypography>
        </div>
      )}
    </div>
  );
};
