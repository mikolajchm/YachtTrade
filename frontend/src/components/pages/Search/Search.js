import { getAllSearch } from "../../../redux/searchRedux";
import { useSelector } from "react-redux";
import styles from './Search.module.scss';
import SearchForm from "../SearchFrom/SearchForm";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';

const Search = () => {

  const results = useSelector(getAllSearch);

  return (
    <div className={styles.container}>

      <div className={styles.searchWrap}>
        <SearchForm />
      </div>

      <Row xs={1} lg={2} xl={3} className={styles.cardsRow}>
        {results?.map(ad => (
          <Col key={ad._id} className={styles.col}>
            <Card className={styles.card}>
              <Carousel indicators={false}>
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
                <div className={styles.infoGrid}>
                  <div className={styles.infoLeft}>
                    <h2 className={styles.make}>{ad.make}</h2>
                    <Button
                      as={Link}
                      to={`/ad/${ad._id}`}
                      className={styles.button}
                    >
                      Read more
                    </Button>
                  </div>

                  <div className={styles.infoRight}>
                    <p>
                      <strong>Price:</strong> {ad.price}$
                    </p>
                    <p>
                      <strong>Fuel:</strong> {ad.typeOfFuel}
                    </p>
                    <p>
                      <strong>Mth:</strong> {ad.mth}
                    </p>
                    <p>
                      <strong>Production:</strong> {ad.year}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Search;