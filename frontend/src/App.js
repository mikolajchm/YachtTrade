import { Routes, Route, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './components/views/NavBar/NavBar';
import Home from './components/pages/Home/Home';
import SingleAd from './components/pages/SingleAd/SingleAd';
import AddAd from './components/pages/AddAd/AddAd';
import EditAd from './components/pages/EditAd/EditAd';
import RemoveAd from './components/pages/RemoveAd/RemoveAd';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';
import Footer from './components/views/Footer/Footer';
import { API_URL } from './config';
import { updateAds } from './redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const isFluid = ['/', '/ad', '*'].includes(location.pathname);

  useEffect(() => {
    
    const options = {
      method: 'GET'
    }

    fetch(`${API_URL}/ads`, options)
      .then(res => res.json())
      .then(data => dispatch(updateAds(data)));
  },[dispatch]);

  return (
    <main>
      <NavBar />
      <Container fluid={isFluid}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<SingleAd />} />
          <Route path="/ad/add" element={<AddAd />} />
          <Route path="/ad/edit/:id" element={<EditAd />} />
          <Route path="/ad/remove/:id" element={<RemoveAd />} />
          <Route path="/search/:searchPharse" element={<SingleAd />} />
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