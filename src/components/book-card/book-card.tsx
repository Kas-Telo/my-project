import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { BookCardType } from '../../api/books/books-api-types';
import coverUndefined from '../../assets/images/cover-undefined.png';
import { useHighlight } from '../../common/hooks/use-highlight';
import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { Rating } from '../../ui/rating/rating';
import { BodyTypography, Subtitle } from '../../ui/typography';
import { ButtonBook } from '../button-book';

import style from './book-card.module.css';

type DefaultDivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = DefaultDivPropsType & {
  bookCard: BookCardType;
  displayOption: 'tile' | 'list';
  path: string;
  filterForHighlightText: string;
};

export const BookCard = ({ bookCard, displayOption, path, filterForHighlightText }: Props) => {
  const containerClass = `${displayOption === 'tile' ? style.containerTile : style.containerList}`;
  const coverClass = `${displayOption === 'tile' ? style.coverTile : style.coverList}`;
  const buttonClass = `${displayOption === 'tile' ? style.buttonTile : style.buttonList}`;
  const titleClass = `${displayOption === 'tile' ? style.titleTile : style.titleList}`;
  const authorClass = `${displayOption === 'tile' ? style.authorTile : style.authorList}`;

  const highlightText = useHighlight(filterForHighlightText);

  const size: Size = useWindowSize();
  const baseURLForImage = 'https://https://strapi.cleverland.by';
  const titleElement = () => {
    if (displayOption === 'tile') {
      return (
        <Subtitle className={titleClass} type='small'>
          {highlightText(bookCard.title)}
        </Subtitle>
      );
    }
    if (size.width > 638) {
      return <h4 className={titleClass}>{highlightText(bookCard.title)}</h4>;
    }

    return (
      <Subtitle className={titleClass} type='small'>
        {highlightText(bookCard.title)}
      </Subtitle>
    );
  };
  const authorElement = () => {
    if (displayOption === 'tile') {
      return (
        <BodyTypography className={authorClass} type='small'>
          {bookCard.authors?.join(', ')}
        </BodyTypography>
      );
    }
    if (size.width <= 638) {
      return (
        <BodyTypography className={authorClass} type='small'>
          {bookCard.authors?.join(', ')}
        </BodyTypography>
      );
    }

    return (
      <BodyTypography className={authorClass} type='large'>
        {bookCard.authors?.join(', ')}
      </BodyTypography>
    );
  };

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <Link to={path} className={containerClass} data-test-id='card'>
      <img
        className={coverClass}
        src={bookCard.image?.url ? `${baseURLForImage}${bookCard.image.url}` : coverUndefined}
        alt='cover'
        loading='lazy'
      />
      <div className={style.descriptionContainer}>
        <div className={style.description}>
          {displayOption === 'tile' && (
            <div style={{ width: '100%', marginBottom: '16px' }}>
              {bookCard.rating ? <Rating rating={bookCard.rating} /> : <p>ещё нет оценок</p>}
            </div>
          )}
          {titleElement()}
          {authorElement()}
        </div>
        {displayOption === 'tile' ? (
          <div className={style.buttonTileContainer}>
            <ButtonBook
              className={buttonClass}
              order={bookCard.booking ? bookCard.booking.order : false}
              handed={bookCard.delivery ? bookCard.delivery.handed : false}
              dateHandedTo={bookCard.delivery ? bookCard.delivery.dateHandedTo : null}
              size='small'
              sizeTypography='small'
              variantTypography='mobile'
              onClick={buttonClickHandler}
            />
          </div>
        ) : (
          <div className={style.ratingWithButtonContainer}>
            <div>
              {bookCard.rating ? (
                <Rating
                  heightOneStar={size.width < 450 ? 16 : 24}
                  widthOneStar={size.width < 450 ? 16 : 24}
                  rating={bookCard.rating}
                />
              ) : (
                <p>ещё нет оценок</p>
              )}
            </div>
            <ButtonBook
              className={buttonClass}
              order={bookCard.booking ? bookCard.booking.order : false}
              handed={bookCard.delivery ? bookCard.delivery.handed : false}
              dateHandedTo={bookCard.delivery ? bookCard.delivery.dateHandedTo : null}
              size='small'
              sizeTypography='small'
              variantTypography='mobile'
              onClick={buttonClickHandler}
            />
          </div>
        )}
      </div>
    </Link>
  );
};
