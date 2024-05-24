import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PokemonContext } from '../App';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { pokemonList, deletePokemon } = useContext(PokemonContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default,
          types: response.data.types.map(type => type.type.name),
          moves: response.data.moves.map(move => move.move.name),
        });
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    const localPokemon = pokemonList.find(p => p.id === parseInt(id));
    if (localPokemon) {
      setPokemon(localPokemon);
    } else {
      fetchPokemonDetails();
    }
  }, [id, pokemonList]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${pokemon?.name}?`);
    if (confirmDelete && pokemon) {
      deletePokemon(pokemon.id);
      navigate('/');
    }
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="justify-content-center mt-4">
      <Row className="justify-content-center mt-4">
        <Col md={10}>
          <Card className="pokemon-card">
            <Card.Body>
              <Link to={`/`} className="back-button">Back</Link>
              <Card.Title className="text-center name-pokemon">{pokemon.name}</Card.Title>
              <Card.Img variant="top" src={pokemon.image} alt={pokemon.name} className="mx-auto d-block pokemon-image" />
              <Card.Text className="text-center">#{pokemon.id}</Card.Text>
              <div className="text-center mb-3">
                <Button className="mr-2 delete-button" variant="danger" onClick={handleDelete}>Delete Pokémon</Button>
                <Link to={`/edit/${pokemon.id}`}>
                  <Button className="edit-button" variant="primary">Edit Pokémon</Button>
                </Link>
              </div>
              <div>
                <h4>Types:</h4>
                <ul className="pokemon-types">
                  {pokemon.types && pokemon.types.length > 0 ? (
                    pokemon.types.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))
                  ) : (
                    <li>No types available</li>
                  )}
                </ul>
              </div>
              <div>
                <h4>Moves:</h4>
                <div className="text-center">
                  <ul className="pokemon-moves">
                    {pokemon.moves && pokemon.moves.length > 0 ? (
                      pokemon.moves.map((move, index) => (
                        <li key={index}>{move}</li>
                      ))
                    ) : (
                      <li>No moves available</li>
                    )}
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonDetails;
