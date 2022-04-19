import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      size="lg"
      className="d-block mx-auto my-5"
      animation="border"
      variant="warning"
    ></Spinner>
  );
};

export default Loader;
