import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../App';
import FilterPokemon from './FilterPokemon';
import PokemonCard from './PokemonCard';
import SortOptions from './SortOptions';

const PokemonGallery = () => {
  const { pokemonList, setPokemonList } = useContext(PokemonContext);
  const [sortType, setSortType] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    name: '',
    types: [],
    moves: []
  });

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
        const pokemonData = await Promise.all(response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            id: pokemonDetails.data.id,
            name: pokemonDetails.data.name,
            image: pokemonDetails.data.sprites.front_default,
            types: pokemonDetails.data.types.map(type => type.type.name),
            moves: pokemonDetails.data.moves.map(move => move.move.name)
          };
        }));
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    if (pokemonList.length === 0) {
      fetchPokemonList();
    }
  }, [pokemonList, setPokemonList]);

  const sortPokemon = (list) => {
    return list.sort((a, b) => {
      if (sortType === 'name') {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } else if (sortType === 'number') {
        if (sortOrder === 'asc') {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      }
      return 0;
    });
  };

  const applyFilters = (list) => {
    const { name, types, moves } = filters;
    return list.filter(pokemon => {
      // Filter by name
      if (name && !pokemon.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      // Filter by types
      if (types.length > 0 && !types.every(type => pokemon.types.includes(type))) {
        return false;
      }
      // Filter by moves
      if (moves.length > 0 && !moves.every(move => pokemon.moves.includes(move))) {
        return false;
      }
      return true;
    });
  };

  return (
    <div className="pokemon-gallery">
      <SortOptions sortType={sortType} setSortType={setSortType} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <FilterPokemon
        allTypes={['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']}
        allMoves={['tackle', 'scratch', 'razor-wind', 'hyper-beam', 'thunderbolt', 'thunder', 'earthquake', 'dig', 'fire-blast', 'surf', 'ice-beam', 'blizzard', 'psybeam', 'rock-slide', 'fire-spin', 'thunder-shock', 'water-gun', 'psywave', 'bubble-beam', 'aerial-ace']}
        filters={filters}
        setFilters={setFilters}
      />
      <Link to="/add">
        <button className="add-pokemon-button">Add New Pokémon</button>
      </Link>
      <div className="pokemon-grid">
        {sortPokemon(applyFilters(pokemonList)).map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonGallery;
