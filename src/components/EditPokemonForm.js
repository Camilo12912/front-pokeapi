import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PokemonContext } from '../App';
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap';

const EditPokemonForm = () => {
  const { id } = useParams();
  const { pokemonList, updatePokemon, allMoves, allTypes } = useContext(PokemonContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    types: [],
    moves: []
  });

  useEffect(() => {
    const pokemonToEdit = pokemonList.find(p => p.id === parseInt(id));
    if (pokemonToEdit) {
      setFormData({
        name: pokemonToEdit.name,
        image: pokemonToEdit.image,
        types: pokemonToEdit.types,
        moves: pokemonToEdit.moves
      });
    }
  }, [id, pokemonList]);

  const handleChange = (name, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.map(option => option.value) : []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePokemon({
      id: parseInt(id),
      ...formData
    });
    navigate('/');
  };

  if (!formData.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-pokemon-form-container">
      <h2>Edit Pokémon</h2>
      <Form onSubmit={handleSubmit} className="edit-pokemon-form">
        <Form.Group controlId="name">
          <Form.Label >Name:</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="mb-4"
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image URL:</Form.Label>
          <Form.Control
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="mb-3"
          />
        </Form.Group>
        <Form.Group controlId="types">
          <Form.Label>Types:</Form.Label>
          <Select
            value={formData.types.map(type => ({ value: type, label: type }))}
            options={allTypes.map(type => ({ value: type, label: type }))}
            onChange={(selectedOption) => handleChange('types', selectedOption)}
            isMulti
            className="mb-3"
          />
        </Form.Group>
        <Form.Group controlId="moves">
          <Form.Label>Moves:</Form.Label>
          <Select
            value={formData.moves.map(move => ({ value: move, label: move }))}
            options={allMoves.map(move => ({ value: move, label: move }))}
            onChange={(selectedOption) => handleChange('moves', selectedOption)}
            isMulti
            className="mb-3"
          />
        </Form.Group>
        <div className="button-group">
          <Button type="submit" className="save-button">Save Changes</Button>
          <Link to={`/pokemon/${id}`} className="back-button">Back</Link>
        </div>
      </Form>
    </div>
  );
};

export default EditPokemonForm;
