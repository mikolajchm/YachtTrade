import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';
import { useSelector } from 'react-redux';

const NavBar = () => {

  const user = useSelector(getUser);

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">YachtTrade</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/ad/add/ad">Add Ad</Nav.Link>
              <Nav.Link as={Link} to="/logout">LogOut</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">LogIn</Nav.Link>
              <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;