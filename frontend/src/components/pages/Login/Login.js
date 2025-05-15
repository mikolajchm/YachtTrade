import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/userRedux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {

  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 500);

      return () => clearTimeout(timeout); 
    }
  }, [status, navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        login, 
        password
      })
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ login }));
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      })

  }

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      
      <h1 className="my-4">Login</h1>

      {status === "success" && (
        <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been successfully logged in!</p>
        </Alert>
      )}

      {status === "serverError" && ( 
        <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
        </Alert>
      )}

      {status === "clientError" && ( 
        <Alert variant="danger">
            <Alert.Heading>Incorrect data</Alert.Heading>
        </Alert>
      )}

      {status === "loading" && ( 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
      )}

      <FormGroup className="mb-3" controlId="formLogin">
        <Form.Label>Login :</Form.Label>
        <Form.Control type="text" value={login} onChange={e =>setLogin(e.target.value)} placeholder="Enter login" />
      </FormGroup>

      <FormGroup className="mb-3" controlId="formPassword">
        <Form.Label>Password :</Form.Label>
        <Form.Control type="text" value={password} onChange={e =>setPassword(e.target.value)} placeholder="Enter password" />
      </FormGroup>

      <Button varian="primary" type="submit">
        Log in
      </Button>

    </Form>
  )
};

export default Login;