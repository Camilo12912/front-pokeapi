import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PokemonGallery from './components/PokemonGallery';
import PokemonDetails from './components/PokemonDetails';
import AddPokemonForm from './components/AddPokemonForm';
import EditPokemonForm from './components/EditPokemonForm';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom/dist';

export const PokemonContext = createContext();

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [allMoves, setAllMoves] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    types: [],
    moves: []
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonResults = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return {
              id: pokemonData.data.id,
              name: pokemonData.data.name,
              image: pokemonData.data.sprites.front_default,
              types: pokemonData.data.types.map(type => type.type.name),
              moves: pokemonData.data.moves.map(move => move.move.name)
            };
          })
        );
        setPokemonList(pokemonResults);
        setFilteredPokemonList(pokemonResults); // Inicialmente, la lista filtrada es la misma que la lista completa
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    const fetchMovesAndTypes = async () => {
      try {
        const [movesResponse, typesResponse] = await Promise.all([
          axios.get('https://pokeapi.co/api/v2/move?limit=1000'),
          axios.get('https://pokeapi.co/api/v2/type?limit=1000')
        ]);
        const moves = movesResponse.data.results.map(move => move.name);
        const types = typesResponse.data.results.map(type => type.name);
        setAllMoves(moves);
        setAllTypes(types);
      } catch (error) {
        console.error('Error fetching moves and types:', error);
      }
    };

    fetchPokemon();
    fetchMovesAndTypes();
  }, []);

  const addPokemon = (newPokemon) => {
    setPokemonList([...pokemonList, newPokemon]);
    setFilteredPokemonList([...filteredPokemonList, newPokemon]); // También añadimos el nuevo Pokémon a la lista filtrada
  };

  const updatePokemon = (updatedPokemon) => {
    setPokemonList(pokemonList.map(p => p.id === updatedPokemon.id ? updatedPokemon : p));
    setFilteredPokemonList(filteredPokemonList.map(p => p.id === updatedPokemon.id ? updatedPokemon : p)); // Actualizamos en la lista filtrada también
  };

  const deletePokemon = (id) => {
    setPokemonList(pokemonList.filter(p => p.id !== id));
    setFilteredPokemonList(filteredPokemonList.filter(p => p.id !== id)); // Eliminamos de la lista filtrada también
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    let filteredResults = pokemonList;

    if (filters.name) {
      filteredResults = filteredResults.filter(pokemon => pokemon.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    if (filters.types && filters.types.length > 0) {
      filteredResults = filteredResults.filter(pokemon => filters.types.every(type => pokemon.types.includes(type)));
    }

    if (filters.moves && filters.moves.length > 0) {
      filteredResults = filteredResults.filter(pokemon => filters.moves.every(move => pokemon.moves.includes(move)));
    }

    setFilteredPokemonList(filteredResults);
  }, [filters, pokemonList]);

  return (
    <PokemonContext.Provider value={{ pokemonList, filteredPokemonList, addPokemon, updatePokemon, deletePokemon, allMoves, allTypes, filters, setFilters, handleFilterChange }}>
    <Router>
      <Navbar bg="primary" expand="lg" variant="dark"> {/* Agregar variant="dark" para texto en color claro */}
        <Navbar.Brand as={Link} to="/">PokeDex</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<PokemonGallery />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/add" element={<AddPokemonForm />} />
        <Route path="/edit/:id" element={<EditPokemonForm />} />
      </Routes>
    </Router>
  </PokemonContext.Provider>
);
};

export default App;