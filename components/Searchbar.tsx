import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import ikon kaca pembesar
import TextField from './TextField';
import Button from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex items-center">
      <TextField placeholder='Search' value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); onSearch(e.target.value) }} />
    </div >
  );
};

export default SearchBar;
