import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import style from './button.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = DefaultButtonPropsType & {
  children: ReactNode;
  size: 'large' | 'small';
  sizeTypography: 'large' | 'small';
  variant: 'primary' | 'secondary';
  variantTypography: 'mobile' | 'desktop';
  submit: boolean;
  dataTestId?: string;
};

export const Button = ({
  dataTestId,
  children,
  disabled,
  size,
  sizeTypography,
  variant,
  variantTypography,
  className,
  submit,
  ...restProps
}: Props) => {
  const classSize = `${size === 'large' ? style.large : style.small}`;
  const classTextSize = `${sizeTypography === 'large' ? style.textLarge : style.textSmall}`;
  const classVariantDesktopTypography = `${
    sizeTypography === 'large' ? style.desktopTextLarge : style.desktopTextSmall
  }`;
  const classVariantMobileTypography = `${sizeTypography === 'small' ? style.mobileTextLarge : style.mobileTextSmall}`;
  const finalClassVariantTypography = `${
    variantTypography === 'desktop' ? classVariantDesktopTypography : classVariantMobileTypography
  }`;
  let classDisabled: string;

  if (disabled) {
    classDisabled = `${variant === 'primary' ? style.disabledPrimary : style.disabledSecondary}`;
  } else {
    classDisabled = `${variant === 'primary' ? style.primary : style.secondary}`;
  }

  const buttonTypographyClass = `${variant === 'primary' ? style.primaryText : style.secondaryText}`;

  return (
    <button
      data-test-id={dataTestId}
      className={`${classSize} ${style.text} ${buttonTypographyClass} ${classTextSize} ${finalClassVariantTypography} ${classDisabled} ${className}`}
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};
