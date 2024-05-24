import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col } from 'react-bootstrap';

const PokemonCard = ({ pokemon }) => {
  return (
    <Col xs={12} sm={6} md={4} className="pokemon-col">
      <Card className="pokemon-cards">
        <Card.Img variant="top" src={pokemon.image} alt={pokemon.name} />
        <Card.Body>
          <Card.Title className="pokemon-name">{pokemon.name}</Card.Title>
          <Card.Text className="pokemon-number">#{pokemon.id}</Card.Text>
          <Link to={`/pokemon/${pokemon.id}`}>
            <Button className="see-more-button">Ver más</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PokemonCard;