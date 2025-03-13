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

export interface Status{
  id: string,
  name: string
}
export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
}

export interface Priority {
  id: number;
  name: string;
  icon: string;
}

export interface Status {
  id: string;
  name: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  priority: Priority;
  status: Status;
  total_comments: number;
}
