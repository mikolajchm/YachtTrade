import { Routes, Route, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './components/views/NavBar/NavBar';
import Home from './components/pages/Home/Home';
import Search from './components/pages/Search/Search';
import SingleAd from './components/pages/SingleAd/SingleAd';
import AddAd from './components/pages/AddAd/AddAd';
import EditAd from './components/pages/EditAd/EditAd';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';
import Footer from './components/views/Footer/Footer';

const App = () => {

  const location = useLocation();
  const isFluid =
  location.pathname === '/' ||
  /^\/ad\/[^/]+$/.test(location.pathname) || 
  location.pathname === '*' ||
  location.pathname === '/search';

  return (
    <main>
      <NavBar />
      <Container fluid={isFluid}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<SingleAd />} />
          <Route path="/ad/add/ad" element={<AddAd />} />
          <Route path="/ad/edit/:id" element={<EditAd />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
};

export default App;