import * as yup from "yup";
export const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phoneNumber: yup.string().required('Phone Number is required'),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    country: yup.string().required('Country is required'),
    nationality: yup.string().required('Nationality is required'),
});