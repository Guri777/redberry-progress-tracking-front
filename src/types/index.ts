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

export interface Status {
  id: number;
  name: string;
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

export interface TaskStatus {
  id: string | number;
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
  status: TaskStatus;
  total_comments: number;
}

export interface Comment {
  id: string;
  text: string;
  author_nickname: string;
  author_avatar: string;
  sub_comments: Comment[];
}
