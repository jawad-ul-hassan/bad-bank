import React from 'react';
import Header from '../../components/Header/Header';
import WithdrawForm from '../../components/WithdrawForm/WithdrawForm';

const Withdraw = ({ balance, setBalance }) => {
  return (
    <>
      <Header />
      <WithdrawForm balance={balance} setBalance={setBalance} />
    </>
  );
};

export default Withdraw;
