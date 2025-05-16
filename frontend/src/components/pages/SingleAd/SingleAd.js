import { getAdById } from "../../../redux/adsRedux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Carousel from 'react-bootstrap/Carousel';
import styles from './SingleAd.module.scss';
import { getUser } from "../../../redux/userRedux";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router";
import Modal from 'react-bootstrap/Modal';
import { API_URL } from '../../../config';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteAd } from "../../../redux/adsRedux";

const SingleAd = () => {

  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (e) => {
    e.preventDefault(); 
    
    const options = {
      method: 'DELETE',
    };

    fetch(`${API_URL}/ads/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
          setShow(false);
          dispatch(deleteAd(id));
          navigate("/");
        } else {
          console.log('Remove failed');
        }
      });
  };

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
              <Button  className="ms-3" variant="danger" onClick={handleShow}> 
                Delete 
              </Button>
              <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Are you sure?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>This operation is irreversible. Do you want to proceed?</Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                          Close
                      </Button>
                      <Button variant="danger" onClick={handleRemove}> 
                          Remove
                      </Button>
                  </Modal.Footer>
              </Modal>
            </>
          ) : (<></>)}
        </div>
      </div>
    </div>
  );
};

export default SingleAd;