import Home from './pages/Home/Home';
import { Switch, Route } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Deposit from './pages/Deposit/Deposit';
import Withdraw from './pages/Withdraw/Withdraw';
import AllData from './pages/AllData/AllData';
import { useState } from 'react';

function App() {
  const [userData, setUserData] = useState([]);
  const [balance, setBalance] = useState(0);

  const userDataHandler = user => {
    setUserData([...userData, user]);
  };

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create-account">
          <CreateAccount userDataHandler={userDataHandler} />
        </Route>
        <Route path="/deposit">
          <Deposit balance={balance} setBalance={setBalance} />
        </Route>
        <Route path="/withdraw">
          <Withdraw balance={balance} setBalance={setBalance} />
        </Route>
        <Route path="/all-data">
          <AllData userData={userData} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
