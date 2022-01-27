import './DepositForm.css';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const DepositForm = ({ balance, setBalance }) => {
  const initialValues = { deposit: '' };

  const validationSchema = Yup.object().shape({
    deposit: Yup.number()
      .typeError('*Deposit Amount must be a number')
      .required('*Deposit Amount is required')
      .positive('*Deposit Amount must be a positive number'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setBalance(parseFloat(balance) + parseFloat(values.deposit));

    setSubmitting(true);

    Swal.fire({
      title: 'Success',
      icon: 'success',
      showConfirmButton: false,
    });

    resetForm();
    setSubmitting(false);
  };

  return (
    <section className="deposit-section">
      <Container>
        <Card>
          <Card.Title>Deposit</Card.Title>
          <div className="deposit-form-container">
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
                <Form onSubmit={handleSubmit} className="deposit-form">
                  <Form.Group controlId="formBasictext" className="mb-3">
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control
                      type="text"
                      name="deposit"
                      className={
                        touched.deposit && errors.deposit ? 'error' : null
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.deposit}
                    />
                    {touched.deposit && errors.deposit ? (
                      <div className="error-message">{errors.deposit}</div>
                    ) : null}
                  </Form.Group>

                  <Button type="submit" disabled={!isValid}>
                    Deposit
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

export default DepositForm;
