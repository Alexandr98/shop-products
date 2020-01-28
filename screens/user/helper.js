import * as Yup from 'yup';

export const validationForm = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  imageUrl: Yup.string().required('Image is required'),
  price: Yup.number().required('Price is required'),
  description: Yup.string()
    .min(3)
    .max(225)
    .required('Description is required'),
});

export default validationForm;
