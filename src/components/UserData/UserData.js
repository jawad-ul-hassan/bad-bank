import './UserData.css';
import { Container, Table } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

const UserData = userData => {
  const tableRows = userData.userData.map((info, ind) => {
    return (
      <tr key={ind}>
        <td>{info.name}</td>
        <td>{info.email}</td>
        <td>{info.password}</td>
      </tr>
    );
  });
  return (
    <section className="user-data">
      <h5>All Data</h5>
      <Container>
        {userData.userData.length > 0 ? (
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        ) : (
          <Alert className="text-center font-weight-bold" variant="secondary">
            There is no data to show! 🙂
          </Alert>
        )}
      </Container>
    </section>
  );
};

export default UserData;
