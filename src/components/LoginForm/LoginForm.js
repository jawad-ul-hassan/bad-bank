import React from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loader from '../Loader';

const LoginForm = () => {
  const initialValues = { email: '', password: '' };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('*Email is required'),
    password: Yup.string().required('*Password is required'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(login(values));
    setSubmitting(true);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
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
          <Card.Title>Login</Card.Title>
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
              isSubmitting,
              isValid,
            }) => (
              <Form onSubmit={handleSubmit} className="create-form">
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
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </section>
  );
};

export default LoginForm;
