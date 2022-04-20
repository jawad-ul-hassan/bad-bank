import React from 'react';
import './AccountForm.css';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loader from '../Loader';

const AccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const initialValues = { userName: '', email: '', password: '' };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('*Name is required'),
    email: Yup.string().required('*Email is required'),
    password: Yup.string()
      .required('*Password is required')
      .min(8, '*Password must have at least 8 characters'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(register(values));
    setSubmitting(true);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      Swal.fire({
        title: 'Success',
        text: 'You have successfully registered',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="create-account">
      <Container>
        <Card>
          <Card.Title>Create Account</Card.Title>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <Form onSubmit={handleSubmit} className="create-form">
                <Form.Group controlId="formBasictext" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="userName"
                    type="text"
                    placeholder="John Doe"
                    className={
                      touched.userName && errors.userName ? 'error' : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                  />
                  {touched.userName && errors.userName ? (
                    <div className="error-message">{errors.userName}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-4">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className={touched.email && errors.email ? 'error' : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email && errors.email ? (
                    <div className="error-message">{errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    className={
                      touched.password && errors.password ? 'error' : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password ? (
                    <div className="error-message">{errors.password}</div>
                  ) : null}
                </Form.Group>
                <Button type="submit" disabled={!isValid}>
                  Create Account
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </section>
  );
};

export default AccountForm;
