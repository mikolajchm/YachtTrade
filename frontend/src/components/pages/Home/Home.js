import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.scss';
import Button from "react-bootstrap/esm/Button";
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  
  const ads = useSelector(getAllAds);

  return (
    <Row xs={1} md={1} xl={3} lg={2} xxl={3} className="g-5 m-auto">
      {ads.map(ad => (
        <Col key={ad._id} className="d-flex justify-content-center">
          <Card key={ad._id} className={styles.card}>
            <Carousel>
              {ad.photos.map(photo => (
                <Carousel.Item key={photo}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/uploads/${photo}`}
                    className={styles.cardImg}
                  />
                </Carousel.Item>
              ))} 
            </Carousel>
            <Card.Body>
              <div className={styles.div}>
                <div className={styles.divchld}>
                  <h1>{ad.make}</h1>
                  <Button className={styles.button} as={Link} to={`/ad/${ad._id}`}>Read more</Button>
                </div>
                <div className={styles.divchld}>
                  <p><strong>Price:</strong> {ad.price}$</p>
                  <p><strong>Fuel:</strong> {ad.typeOfFuel}</p>
                  <p><strong>Mth:</strong> {ad.mth}</p>
                  <p><strong>Production:</strong> {ad.year}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
};

export default Home;