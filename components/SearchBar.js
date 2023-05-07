import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();


  const handleSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: '/search',
      query: { search: searchTerm },
    });
    setSearchTerm('');
  };

  return (
    <form 

    className='relative w-full
    align-middle
    '
    onSubmit={handleSubmit}><div className="input-group   ">
       <input
      htmlFor="search"
        type="text"
        name="search"
        id="search"
        className="input bg-light border-none "
        placeholder="Search for products"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
  <button
        type="submit"
        className="btn btn-square bg-secondary
        hover:bg-secondary
        border-none
        ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
      {searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white rounded-md shadow-md mt-1">
          {searchResults.map((result) => (
            <li key={result.id} className="px-4 py-2 hover:bg-gray-100">
              <Link href={`/products/${result.id}`}>
                <a>{result.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}</div>
    </form>
  );
}