import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">YachtTrade</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/register">Sign up</Nav.Link>
          <Nav.Link href="/login">LogIn</Nav.Link>
          <Nav.Link href="/logout">LogOut</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
};

export default NavBar;