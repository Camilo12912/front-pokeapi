import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { PokemonContext } from '../App';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddPokemonForm = () => {
  const { addPokemon } = useContext(PokemonContext);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [image, setImage] = useState('');
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && number && image && types.length && moves.length) {
      const newPokemon = {
        id: parseInt(number),
        name,
        image,
        types: types.map(type => ({ type: { name: type.value } })),
        moves: moves.map(move => ({ move: { name: move.value } }))
      };
      addPokemon(newPokemon);
      navigate('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  const allTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dragon', 'dark', 'steel', 'fairy'
  ];
  
  const allMoves = [
    'tackle', 'scratch', 'razor-wind', 'hyper-beam', 'thunderbolt',
    'thunder', 'earthquake', 'dig', 'fire-blast', 'surf', 'ice-beam',
    'blizzard', 'psybeam', 'rock-slide', 'fire-spin', 'thunder-shock',
    'water-gun', 'psywave', 'bubble-beam', 'aerial-ace'
  ];
  
  const typeOptions = allTypes.map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }));
  const moveOptions = allMoves.map(move => ({ value: move, label: move.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }));

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>

          <Form onSubmit={handleSubmit} className="add-pokemon-form">
          <Link to="/" className="back-button">Back</Link>
            <Form.Group controlId="formPokemonName">
              <Form.Label>Pokémon Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPokemonNumber">
              <Form.Label>Pokémon Number</Form.Label>
              <Form.Control
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPokemonImage">
              <Form.Label>Pokémon Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPokemonTypes">
              <Form.Label>Pokémon Types</Form.Label>
              <Select
                options={typeOptions}
                isMulti
                value={types}
                onChange={setTypes}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPokemonMoves">
              <Form.Label>Pokémon Moves</Form.Label>
              <Select
                options={moveOptions}
                isMulti
                value={moves}
                onChange={setMoves}
                required
              />
            </Form.Group>
            <Button  type="submit" className="mt-3 btn-success">
              Add Pokémon
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPokemonForm;
