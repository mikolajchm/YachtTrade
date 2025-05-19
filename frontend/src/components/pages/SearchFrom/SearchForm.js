import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './SearchForm.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { API_URL } from '../../../config';
import { loadSearch } from '../../../redux/searchRedux';

const SearchForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSubmit = e => { 
    e.preventDefault();

    fetch(`${API_URL}/ads/search/${encodeURIComponent(search)}`)
      .then(res => {
        if (res.ok) return res.json();         
        throw new Error(res.status);
      })
      .then(data => {
        dispatch(loadSearch(data));             
        navigate('/search');
      })
      .catch(err => console.error('Search error:', err));
    
  };

  return (
    <Form className={styles.searchForm} onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col xs="auto">
          <Form.Control
            className={styles.input}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
          />
        </Col>
        <Col xs="auto">
          <Button className={styles.button} type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};


export default SearchForm;