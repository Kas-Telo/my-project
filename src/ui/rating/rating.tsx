import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { Icon } from '../icon/icon';

type DefaultDivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = DefaultDivPropsType & {
  widthOneStar?: number;
  heightOneStar?: number;
  gap?: number;
  rating: number | null;
  setRate?: (rate: 0 | 1 | 2 | 3 | 4 | 5) => void;
};

export const Rating = ({ rating, setRate, className, widthOneStar = 24, heightOneStar = 24, gap = 6 }: Props) => (
  <div className={`${className}`} style={{ display: 'flex', flexDirection: 'row', columnGap: `${gap}px` }}>
    {rating && rating >= 1 ? (
      <Icon width={widthOneStar} height={heightOneStar} title='default-star' onClick={() => setRate && setRate(0)} />
    ) : (
      <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(1)} />
    )}
    {rating && rating >= 2 ? (
      <Icon width={widthOneStar} height={heightOneStar} title='default-star' onClick={() => setRate && setRate(1)} />
    ) : (
      <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(2)} />
    )}
    {rating && rating >= 3 ? (
      <Icon width={widthOneStar} height={heightOneStar} title='default-star' onClick={() => setRate && setRate(2)} />
    ) : (
      <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(3)} />
    )}
    {rating && rating >= 4 ? (
      <Icon width={widthOneStar} height={heightOneStar} title='default-star' onClick={() => setRate && setRate(3)} />
    ) : (
      <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(4)} />
    )}
    {rating && rating >= 5 ? (
      <Icon width={widthOneStar} height={heightOneStar} title='default-star' onClick={() => setRate && setRate(4)} />
    ) : (
      <Icon width={widthOneStar} height={heightOneStar} title='outline-star' onClick={() => setRate && setRate(5)} />
    )}
  </div>
);
