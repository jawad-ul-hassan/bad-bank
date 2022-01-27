import React from 'react';
import './WithdrawForm.css';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const WithdrawForm = ({ balance, setBalance }) => {
  const initialValues = { withdraw: '' };

  const validationSchema = Yup.object().shape({
    withdraw: Yup.number()
      .typeError('*Withdraw Amount must be a number')
      .required('*Withdraw Amount is required')
      .positive('*Withdraw Amount must be a positive number'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    if (parseFloat(values.withdraw) > parseFloat(balance)) {
      Swal.fire({
        title: 'Error',
        text: 'You do not have enough balance',
        icon: 'error',
        showConfirmButton: false,
      });
    } else {
      setBalance(parseFloat(balance) - parseFloat(values.withdraw));
      setSubmitting(true);

      Swal.fire({
        title: 'Success',
        icon: 'success',
        showConfirmButton: false,
      });

      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <section className="withdraw-section">
      <Container>
        <Card>
          <Card.Title>Withdraw</Card.Title>
          <div className="withdraw-form-container">
            <div className="total-balance">
              <p className="balance-title">Balance</p>
              <p className="total-balance">{parseFloat(balance).toFixed(2)}</p>
            </div>
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
                <Form onSubmit={handleSubmit} className="withdraw-form">
                  <Form.Group controlId="formBasictext" className="mb-3">
                    <Form.Label>Withdraw Amount</Form.Label>
                    <Form.Control
                      type="text"
                      name="withdraw"
                      className={
                        touched.withdraw && errors.withdraw ? 'error' : null
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.withdraw}
                    />
                    {touched.withdraw && errors.withdraw ? (
                      <div className="error-message">{errors.withdraw}</div>
                    ) : null}
                  </Form.Group>

                  <Button type="submit" disabled={!isValid}>
                    Withdraw
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default WithdrawForm;
