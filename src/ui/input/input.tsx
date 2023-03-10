import {
  ChangeEvent,
  DetailedHTMLProps,
  FocusEvent,
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  Ref,
  useState,
} from 'react';

import { Icon } from '../icon/icon';

import style from './input.module.css';

type DefaultInputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type InputPropsType = DefaultInputType & {
  checkMark?: boolean;
  className?: string;
  isError?: boolean;
};
export const Input = forwardRef((props: InputPropsType, ref: Ref<HTMLInputElement>) => {
  const { type, onChange, onFocus, onBlur, placeholder, checkMark, className, isError, ...restProps } = props;
  const [viewPasswordMode, setViewPasswordMode] = useState<'public' | 'private'>('private');
  const [inputFocus, setInputFocus] = useState(false);
  const [value, setValue] = useState('');

  const classFocusInputContainerClass = `${
    inputFocus || value ? style.focusInputContainer : style.unFocusInputContainer
  }`;
  const classErrorInputContainer = `${isError ? style.errorInput : ''}`;
  const classLabelPlaceholder = `${value || inputFocus ? style.labelPlaceholderActive : style.labelPlaceholder}`;
  const classInputFocusContent = `${value || inputFocus ? style.inputFocusContent : style.inputUnFocusContent}`;

  const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    setInputFocus(true);
    if (onFocus) onFocus(e);
  };
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setInputFocus(false);
    if (onBlur) onBlur(e);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (onChange) onChange(e);
  };

  return (
    <div
      className={`${style.inputContainer} ${classFocusInputContainerClass} ${classErrorInputContainer} ${className}`}
    >
      <div className={`${style.inputContentContainer}`}>
        <div className={`${style.content} ${classInputFocusContent}`}>
          <label className={classLabelPlaceholder}>{placeholder}</label>
          <input
            className={`${style.input}`}
            type={type === 'password' ? (viewPasswordMode === 'private' ? 'password' : 'text') : type}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            ref={ref}
            {...restProps}
          />
        </div>
        {(value || inputFocus) && (
          <Fragment>
            {type === 'password' && checkMark && <Icon dataTestId='checkmark' title='check-true' />}
            {type === 'password' && viewPasswordMode === 'public' && (
              <Icon dataTestId='eye-opened' title='eye-open' onClick={() => setViewPasswordMode('private')} />
            )}
            {type === 'password' && viewPasswordMode === 'private' && (
              <Icon dataTestId='eye-closed' title='eye-close' onClick={() => setViewPasswordMode('public')} />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
});
