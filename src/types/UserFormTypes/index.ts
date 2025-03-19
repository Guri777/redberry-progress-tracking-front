import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().min(2).max(255).required(),
  surname: yup.string().min(2).max(255).required(),
  department_id: yup.string().required(),
  avatar: yup.string().required('Avatar-ის ატვირთვა სავალდებულოა'),
});

export type FormValues = yup.InferType<typeof schema>;

export interface FormFieldType {
  name: keyof FormValues;
  label: string;
  type: 'text' | 'select' | 'file';
  options?: {
    value: string | number;
    label: string;
  }[];
}
