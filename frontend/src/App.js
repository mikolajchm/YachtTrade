import { Routes, Route, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const App = () => {
  const location = useLocation();
  const isFluid = ['/ad'].includes(location.pathname);

  return (
    <main>
      <NavBar />
      <Container fluid={isFluid}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad" element={<SingleAd />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </main>
  );
};

export default App;