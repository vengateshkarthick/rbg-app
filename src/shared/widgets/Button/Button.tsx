import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import './Button.css';

const buttonStyles = cva('app-btn', {
  variants: {
    variant: {
      primary: 'app-btn--primary',
      outline: 'app-btn--outline'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

export type ButtonVariant = NonNullable<VariantProps<typeof buttonStyles>['variant']>;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>, VariantProps<typeof buttonStyles> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Button({ children, variant, className, style, ...rest }: ButtonProps) {
  const classes = buttonStyles({ variant, className });

  return (
    <button {...rest} className={classes} style={style}>
      {children}
    </button>
  );
}


