import { ReactElement } from 'react';

export interface ChildrenType {
  window?: () => Window;
  children?: ReactElement | ReactElement[] | any;
}

export interface NavButton {
  text: string;
  prefix?: string;
  sx?: object;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
}

export interface NavButtonProps {
  buttons?: NavButton[];
}
