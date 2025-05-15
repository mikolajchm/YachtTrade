import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { API_URL } from '../../../config';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Register.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Register = () => {

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };

  const navigate = useNavigate();

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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password
      }),
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
        } else if (res.status === 409) {
          setStatus('warning');
        } else if (res.status === 400) {
          setStatus('danger');
        } else if (res.status === 500) {
          setStatus('danger');
        } else {
          setStatus('severError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      })
  }

  return (
    <Form onSubmit={handleSubmit} className="m-5">

      {status === "success" && (
        <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been successfully registered!</p>
        </Alert>
      )}

      {status === "danger" && (
        <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again !</p>
        </Alert>
      )}

      {status === "danger" && (
        <Alert variant="danger">
            <Alert.Heading>No enough data</Alert.Heading>
            <p>You have to fill all the fields.</p>
        </Alert>
      )}

      {status === "warning" && ( 
        <Alert variant="warning">
            <Alert.Heading>Login already in use</Alert.Heading>
            <p>You have to use other login...</p>
        </Alert>
      )}

      {status === "serverError" && ( 
        <Alert variant="warning">
            <Alert.Heading>ServerError</Alert.Heading>
        </Alert>
      )}

      {status === "loading" && ( 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
      )}

      <Row className="justify-content-center">
        <Col xxl={5} xl={5} lg={6} md={6}>
        
          <Form.Group className="mb-3" controlId="formLogin">
            <Form.Label>Login :</Form.Label>
            <Form.Control
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Enter login"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Register
          </Button>
          </div>
        </Col>

        <Col xxl={4} xl={4} lg={5} md={6} className={styles.googleLoginCol}>
          <div className={styles.googleLoginBox}>
            <button onClick={handleGoogleLogin}>
              <i className="fa fa-google"></i>
              <span>Sign in with Google</span>
            </button>
          </div>
        </Col>
      </Row>
    </Form>
  )
};

export default Register;