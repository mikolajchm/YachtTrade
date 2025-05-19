import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addAd } from '../../../redux/adsRedux';
import { useState } from 'react';

const AddAd = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [make, setMake] = useState('');
  const [condition, setCondition] = useState('');
  const [year, setYear] = useState('');
  const [typeOfFuel, setTypeOfFuel] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [horseOfPower, setHorseOfPower] = useState('');
  const [mth, setMth] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 

  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();

    fd.append('title', title);
    fd.append('description', description);
    fd.append('make', make);
    fd.append('condition', condition);
    fd.append('year', year);
    fd.append('typeOfFuel', typeOfFuel);
    fd.append('engineCapacity', engineCapacity);
    fd.append('horseOfPower', horseOfPower);
    fd.append('mth', mth);
    fd.append('countryOfOrigin', countryOfOrigin);
    photos.forEach(photo => fd.append('photos', photo));
    fd.append('price', price);
    fd.append('location', location);
    fd.append('phoneNumber', phoneNumber);

    const options = {
      method: 'POST',
      body: fd
    };
    
    fetch(`${API_URL}/ads`, options)
      .then(res => {
        if (res.status === 201) {
          navigate('/');
        } else {
          throw new Error(`Unexpected response status: ${res.status}`);
        }
      })
      .catch(err => console.error('Error:', err));
  };


  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add Advertisement</h1>

      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control minLength={5} maxLength={15} type="text" value={title} onChange={e => setTitle(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMake">
        <Form.Label>Make</Form.Label>
        <Form.Select value={make} onChange={e => setMake(e.target.value)} required>
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
        <Form.Control min={1900} max={2025} type="number" value={year} onChange={e => setYear(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control min={0} type="number" value={price} onChange={e => setPrice(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control minLength={20} maxLength={1000} as="textarea" rows={5} value={description} onChange={e => setDescription(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFuel">
        <Form.Label>Fuel Type</Form.Label>
        <Form.Control type="text" value={typeOfFuel} onChange={e => setTypeOfFuel(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMth">
        <Form.Label>Engine Hours (mth)</Form.Label>
        <Form.Control min={0} max={9999} type="number" value={mth} onChange={e => setMth(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMth">
        <Form.Label>Condition </Form.Label>
        <Form.Control type="text" value={condition} onChange={e => setCondition(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMth">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMth">
        <Form.Label>Country of origin</Form.Label>
        <Form.Control type="text" value={countryOfOrigin} onChange={e => setCountryOfOrigin(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorsePower">
        <Form.Label>Horsepower </Form.Label>
        <Form.Control min={0} max={9999} type="number" value={horseOfPower} onChange={e => setHorseOfPower(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEngineCapacity">
        <Form.Label>Engine size (cm3)</Form.Label>
        <Form.Control min={0} max={9999} type="number" value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFiles">
        <Form.Label>Photos </Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={e => {
            const files = Array.from(e.target.files);
            setPhotos(files); 
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">Add ad</Button>
    </Form>
  )
};

export default AddAd;