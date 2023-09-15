import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useFormSubmit from '../../firebase/hooks/useFormSubmit';
import { yupResolver } from '@hookform/resolvers/yup';
import {schema} from './validation/yupValid'


const Register = () => {
    const onSubmit = useFormSubmit();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data) => {
        try {
            await onSubmit(data);
            setRegistrationSuccess(true);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const countryOptions = [
        { value: 'Украина', label: 'Украина' },
        { value: 'Россия', label: 'Россия' },
        { value: 'Беларусь', label: 'Беларусь' },
        { value: 'American', label: 'American' },
        { value: 'England', label: 'England' },
        { value: 'Scotland', label: 'Scotland' },
        { value: 'Spain', label: 'Spain' },
    ];

    const nationalityOptions = [
        { value: 'Украинец', label: 'Украинец' },
        { value: 'Русский', label: 'Русский' },
        { value: 'Беларус', label: 'Беларус' },
        { value: 'American', label: 'American' },
        { value: 'English', label: 'English' },
        { value: 'Spain', label: 'Spain' },
    ];

    return (
       <div>

        {registrationSuccess && (
            <div className="alert alert-success" role="alert">
                Registration successful!
            </div>
        )}
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-3">
                <input
                    {...register('firstName')}
                    className="form-control"
                    placeholder="First Name"
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div className="mb-3">
                <input
                    {...register('lastName')}
                    className="form-control"
                    placeholder="Last Name"
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <div className="mb-3">
                <input
                    {...register('phoneNumber')}
                    className="form-control"
                    placeholder="Phone Number"
                />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>
            <div className="mb-3">
                <input
                    {...register('email')}
                    className="form-control"
                    placeholder="Email"
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="mb-3">
                <input
                    {...register('password')}
                    className="form-control"
                    placeholder="Password"
                    type="password"
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="mb-3">
                <input
                    {...register('confirmPassword')}
                    className="form-control"
                    placeholder="Confirm Password"
                    type="password"
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <div className="mb-3">
                <select {...register('country')} className="form-select">
                    <option value="">Select country</option>
                    {countryOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.country && <p>{errors.country.message}</p>}
            </div>
            <div className="mb-3">
                <select {...register('nationality')} className="form-select">
                    <option value="">Select nationality</option>
                    {nationalityOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.nationality && <p>{errors.nationality.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
       </div>
    );
};

export default Register
