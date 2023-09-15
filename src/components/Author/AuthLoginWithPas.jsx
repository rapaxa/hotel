import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
});

export default function AuthLoginWithPas() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const handleUserLogin = (uid) => {
    };

    const handleLoginError = (error) => {
        console.error('Error:', error);
    };

    const onSubmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                handleUserLogin(userCredential.user.uid);
            })
            .catch(handleLoginError);
    };


    return (
        <>

            <Container className="d-flex align-items-center justify-content-center min-vh-100">
                <Row>
                    <Col md={30} className="mx-auto">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" {...register('email')} placeholder="Enter email"/>
                                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" {...register('password')} placeholder="Password"/>
                                {errors.password &&
                                    <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                        {/*{isAuthenticated && <p className="mt-3 text-success text-center">Login successful. Redirecting...</p>}*/}
                    </Col>
                </Row>
            </Container>


        </>
    );
}
