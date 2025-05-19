import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.scss';
import Button from "react-bootstrap/esm/Button";
import { Link } from 'react-router-dom';
import SearchForm from "../SearchFrom/SearchForm";
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_URL } from "../../../config";
import { updateAds } from "../../../redux/adsRedux";

const Home = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
      const options = {
        method: 'GET'
      }
  
      fetch(`${API_URL}/ads`, options)
        .then(res => res.json())
        .then(data => dispatch(updateAds(data)));
    },[dispatch]);

  const ads = useSelector(getAllAds);


  return (
    <div>
      <div className={styles.searchWrap}>
        <SearchForm />
      </div>
      <Row xs={1} md={1} xl={3} lg={2} xxl={3} className={styles.row}>
        {ads.map(ad => (
          <Col key={ad._id} className="d-flex justify-content-center">
            <Card className={styles.card}>
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
    </div>
  )
};

export default Home;