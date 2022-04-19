import './DepositForm.css';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const DepositForm = () => {
  const initialValues = { amount: '' };
  const [balance, setBalance] = useState();

  const userToken = useSelector(state => state.auth.user.token);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('*Deposit Amount must be a number')
      .required('*Deposit Amount is required')
      .positive('*Deposit Amount must be a positive number'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const config = {
      headers: { Authorization: `JWT ${userToken}` },
    };

    const api = 'https://enigmatic-dawn-40394.herokuapp.com/api/user/deposit';
    axios.post(api, values, config).then(res => {
      setBalance(res.data.balance);
    });

    setSubmitting(true);
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text: 'Deposit Successful',
      showConfirmButton: false,
      timer: 1500,
    });

    resetForm();
  };

  useEffect(() => {
    const getBalance = async () => {
      const config = {
        headers: { Authorization: `JWT ${userToken}` },
      };

      const api = 'https://enigmatic-dawn-40394.herokuapp.com/api/user/deposit';
      await axios.get(api, config).then(res => {
        setBalance(res.data.balance);
      });
    };
    getBalance();
  }, [setBalance, userToken]);

  return (
    <section className="deposit-section">
      <Container>
        <Card>
          <Card.Title>Deposit</Card.Title>
          <div className="deposit-form-container">
            <div className="total-balance">
              <p className="balance-title">Balance</p>
              <p className="total-balance">{balance}</p>
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
                      name="amount"
                      className={
                        touched.amount && errors.amount ? 'error' : null
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount}
                    />
                    {touched.amount && errors.amount ? (
                      <div className="error-message">{errors.amount}</div>
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
