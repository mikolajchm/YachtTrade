import { getAdById } from "../../../redux/adsRedux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Carousel from 'react-bootstrap/Carousel';
import styles from './SingleAd.module.scss';
import { getUser } from "../../../redux/userRedux";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router";

const SingleAd = () => {

  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);

  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        <Carousel>
          {ad.photos.map((photo, index) => (
            <Carousel.Item key={index}>
              <img
                src={`http://localhost:8000/uploads/${photo}`}
                alt={`Slide ${index + 1}`}
                className={styles.carouselImg}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className={styles.details}>
        <h1 className={styles.title}>{ad.title}</h1>
        <h2 className={styles.make}>{ad.make}</h2>

        <div className={styles.grid}>
          <div><strong>Price:</strong> ${ad.price}</div>
          <div><strong>Year:</strong> {ad.year}</div>
          <div><strong>Fuel:</strong> {ad.typeOfFuel}</div>
          <div><strong>Horsepower:</strong> {ad.horseOfPower} HP</div>
          <div><strong>Engine Capacity:</strong> {ad.engineCapacity} cm³</div>
          <div><strong>MTH:</strong> {ad.mth}</div>
          <div><strong>Condition:</strong> {ad.condition}</div>
          <div><strong>Origin:</strong> {ad.countryOfOrigin}</div>
          <div><strong>Location:</strong> {ad.location}</div>
        </div>

        <div className={styles.description}>
          <h3>Description:</h3>
          <p>{ad.description}</p>
        </div>

        <div className={styles.contact}>
          <h4>Contact seller:</h4>
          <p>Phone: <strong>{ad.phoneNumber}</strong></p>
        </div>
        <div className={styles.admin}>
          { user && user.id === ad.sellerInfo ? (
            <>
              <Button as={Link} to={`/ad/edit/${ad._id}`} variant="success">Edit Ad</Button>
              <Button as={Link} to={`/ad/remove/${ad._id}`} variant="danger">Delete Ad</Button>
            </>
          ) : (<></>)}
        </div>
      </div>
    </div>
  );
};

export default SingleAd;