export interface FormFieldType {
  name: string;
  label: string;
  type: 'text' | 'file' | 'select' | 'date' | 'textarea';
  options?: { label: string; value: number; avatar?: string }[];
  otherProps?: any;
  attrs?: any;
  isLoading?: boolean;
  addButton?: {
    display: boolean;
    text: string;
    onClick: () => void;
  };
}

export interface Props {
  open?: boolean;
  onClose?: () => void;
}

export interface Department {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
}
export interface Employee {
  id: number;
  name: string;
  department: Department;
}

export interface FormValues {
  name: string;
  description: string;
  avatar?: string;
  priority_id: number;
  status_id: number;
  department_id: number;
  employee_id: number;
  due_date: any;
}

export interface FormTask {
  id: number;
  name: string;
  description: string;
  priority_id: number;
  status_id: number;
  department_id: number;
  employee_id: number;
  due_date: string;
  created_at: string;
  updated_at: string;
}
