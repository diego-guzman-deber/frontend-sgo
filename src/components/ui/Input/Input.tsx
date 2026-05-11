import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.css';

export type InputStatus = 'default' | 'error' | 'success';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?:      string;
  hint?:       string;
  error?:      string;
  status?:     InputStatus;
  leftIcon?:   ReactNode;
  rightIcon?:  ReactNode;
  id:          string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    status = 'default',
    leftIcon,
    rightIcon,
    id,
    className = '',
    ...props
  },
  ref,
) {
  const resolvedStatus: InputStatus = error ? 'error' : status;

  const wrapperClasses = [
    styles.wrapper,
    styles[resolvedStatus],
    leftIcon  ? styles.hasLeft  : '',
    rightIcon ? styles.hasRight : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        {leftIcon && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          className={[styles.input, className].filter(Boolean).join(' ')}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          aria-invalid={resolvedStatus === 'error' || undefined}
          {...props}
        />

        {rightIcon && (
          <span className={styles.iconRight} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <span id={`${id}-error`} className={styles.errorMsg} role="alert">
          {error}
        </span>
      )}

      {hint && !error && (
        <span id={`${id}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  );
});
