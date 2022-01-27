import React from 'react';
import Header from '../../components/Header/Header';
import UserData from '../../components/UserData/UserData';

const AllData = ({ userData }) => {
  return (
    <>
      <Header />
      <UserData userData={userData} />
    </>
  );
};

export default AllData;
