import React from 'react';
import Header from '../../components/Header/Header';
import DepositForm from '../../components/DepositForm/DepositForm';

const Deposit = ({ balance, setBalance }) => {
  return (
    <>
      <Header />
      <DepositForm balance={balance} setBalance={setBalance} />
    </>
  );
};

export default Deposit;
