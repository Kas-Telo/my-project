import { MouseEventHandler } from 'react';

import { Button } from '../../ui';

type Props = {
  className?: string;
  order: boolean;
  handed: boolean;
  dateHandedTo: Date | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
  size: 'small' | 'large';
  sizeTypography: 'small' | 'large';
  variantTypography: 'mobile' | 'desktop';
};

export const ButtonBook = ({
  className,
  order,
  handed,
  dateHandedTo,
  onClick,
  sizeTypography,
  variantTypography,
  size,
}: Props) => (
  <div className={className}>
    {order ? (
      <Button
        style={{ width: '100%' }}
        size={size}
        sizeTypography={sizeTypography}
        variant='secondary'
        variantTypography={variantTypography}
        disabled={true}
        submit={false}
      >
        Забронирована
      </Button>
    ) : handed ? (
      <Button
        style={{ width: '100%' }}
        size={size}
        sizeTypography={sizeTypography}
        variant='secondary'
        variantTypography={variantTypography}
        disabled={true}
        submit={false}
      >{`Занята до ${dateHandedTo ? dateHandedTo : '01.24'}`}</Button>
    ) : (
      <Button
        style={{ width: '100%', zIndex: '2' }}
        size={size}
        sizeTypography={sizeTypography}
        variant='primary'
        variantTypography={variantTypography}
        submit={false}
        onClick={onClick}
      >
        Забронировать
      </Button>
    )}
  </div>
);
