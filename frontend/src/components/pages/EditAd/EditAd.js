import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUser } from '../../../redux/userRedux';
import { getAdById } from '../../../redux/adsRedux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './EditAd.module.scss';
import { API_URL } from '../../../config';
import { editAd } from '../../../redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Alert from 'react-bootstrap/Alert';

const EditAd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);

  const [title, setTitle] = useState(ad.title);
  const [make, setMake] = useState(ad.make);
  const [year, setYear] = useState(ad.year);
  const [price, setPrice] = useState(ad.price);
  const [description, setDescription] = useState(ad.description);
  const [typeOfFuel, setTypeOfFuel] = useState(ad.typeOfFuel);
  const [mth, setMth] = useState(ad.mth);
  const [location, setLocation] = useState(ad.location);
  const [horseOfPower, setHorseOfPower] = useState(ad.horseOfPower);
  const [engineCapacity, setEngineCapacity] = useState(ad.engineCapacity);
  const [condition, setCondition] = useState(ad.condition);
  const [phoneNumber, setPhoneNumber] = useState(ad.phoneNumber);
  const [countryOfOrigin, setCountryOfOrigin] = useState(ad.countryOfOrigin);
  const [photos, setPhotos] = useState([]); 

  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append('title', title);
    fd.append('make', make);
    fd.append('year', year);
    fd.append('price', price);
    fd.append('description', description);
    fd.append('typeOfFuel', typeOfFuel);
    fd.append('mth', mth);
    fd.append('location', location);
    fd.append('horseOfPower', horseOfPower);
    fd.append('engineCapacity', engineCapacity);
    fd.append('condition', condition);
    fd.append('phoneNumber', phoneNumber);
    fd.append('countryOfOrigin', countryOfOrigin);

  
    if (photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        fd.append('photos', photos[i]);
      }
    }

    const options = {
      method: 'PUT',
      body: fd,
    };

    fetch(`${API_URL}/ads/${id}`, options)
      .then(async (res) => {
        if (res.status === 200) {
          setStatus('success');
          setTimeout(() => navigate('/'), 1500); 
        } else {
          setStatus('danger');
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus('danger');
      });
  };

  if (!ad) {
    return <p>Loading ad data...</p>;
  }

  if (user && user.id === ad.sellerInfo) {
    return (
      <Form onSubmit={handleSubmit} className={styles.form}>
        {status === 'success' && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>Ad has been edited!</p>
          </Alert>
        )}

        {status === 'danger' && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
        )}

        <div className={styles.editAdContainer}>
          <h1 className={styles.heading}>Edit Advertisement</h1>

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              minLength={5}
              maxLength={15}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMake">
            <Form.Label>Make</Form.Label>
            <Form.Select value={make} onChange={(e) => setMake(e.target.value)} required>
              <option value="">Select make</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="Sea-Doo">Sea-Doo</option>
              <option value="Bayliner">Bayliner</option>
              <option value="Chaparral">Chaparral</option>
              <option value="Beneteau">Beneteau</option>
              <option value="Jeanneau">Jeanneau</option>
              <option value="MasterCraft">MasterCraft</option>
              <option value="Sea Ray">Sea Ray</option>
              <option value="Tracker">Tracker</option>
              <option value="Cobalt Boats">Cobalt Boats</option>
              <option value="Lund">Lund</option>
              <option value="Boston Whaler">Boston Whaler</option>
              <option value="Four Winns">Four Winns</option>
              <option value="Scarab">Scarab</option>
              <option value="Other">Other...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formYear">
            <Form.Label>Year</Form.Label>
            <Form.Control
              min={1900}
              max={2025}
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              min={0}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              minLength={20}
              maxLength={1000}
              as="textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFuel">
            <Form.Label>Fuel Type</Form.Label>
            <Form.Control
              type="text"
              value={typeOfFuel}
              onChange={(e) => setTypeOfFuel(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMth">
            <Form.Label>Engine Hours (mth)</Form.Label>
            <Form.Control
              min={0}
              max={9999}
              type="number"
              value={mth}
              onChange={(e) => setMth(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCondition">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHorsePower">
            <Form.Label>Horsepower</Form.Label>
            <Form.Control
              type="text"
              value={horseOfPower}
              onChange={(e) => setHorseOfPower(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEngineCapacity">
            <Form.Label>Engine Capacity</Form.Label>
            <Form.Control
              type="text"
              value={engineCapacity}
              onChange={(e) => setEngineCapacity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCountryOfOrigin">
            <Form.Label>Country of Origin</Form.Label>
            <Form.Control
              type="text"
              value={countryOfOrigin}
              onChange={(e) => setCountryOfOrigin(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhotos">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPhotos([...e.target.files])}
              multiple
              accept="image/*"
            />
          </Form.Group>

          <Button type="submit" variant="primary">Edit Ad</Button>
        </div>
      </Form>
    );
  }

  return <p>You are not authorized to edit this ad.</p>;
};

export default EditAd;