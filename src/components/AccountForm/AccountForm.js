import React from 'react';
import './AccountForm.css';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AccountForm = ({ userDataHandler }) => {
  const [formSubmit, setformSubmit] = useState(true);

  const initialValues = { name: '', email: '', password: '' };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('*Name is required'),
    email: Yup.string().required('*Email is required'),
    password: Yup.string()
      .required('*Password is required')
      .min(8, '*Password must have at least 8 characters'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    userDataHandler(values);
    setSubmitting(true);
    Swal.fire({
      title: 'Success',
      icon: 'success',
      showConfirmButton: false,
    });

    resetForm();
    setformSubmit(false);

    setSubmitting(false);
  };

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
              isSubmitting,
              isValid,
            }) => (
              <Form onSubmit={handleSubmit} className="create-form">
                <Form.Group controlId="formBasictext" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className={touched.name && errors.name ? 'error' : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
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
                  {formSubmit ? 'Create Account' : 'Create Another Account'}
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
