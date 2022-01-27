import React from 'react';
import Header from '../../components/Header/Header';
import AccountForm from '../../components/AccountForm/AccountForm';

const CreateAccount = ({ userDataHandler }) => {
  return (
    <>
      <Header />
      <AccountForm userDataHandler={userDataHandler} />
    </>
  );
};

export default CreateAccount;
