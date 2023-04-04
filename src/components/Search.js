
import React from 'react'
import { useState } from 'react'

function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value.toLowerCase());
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = async () => {
        const response = await fetch(`https://poetrydb.org/${searchType}/${searchInput}`);
        const result = await response.json();
        console.log('fetch result: ', result);
        setSearchResults(result);
    

    } 

    return (
        <>
            <div className='grid grid-col-1 justify-center w-full'>
        <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>search for poems</h1>
        <div className='flex justify-center space-x-3 p-10'>
            <input type='text' value={searchInput} onChange={handleInputChange} className='bg-transparent border-2 border-lime-400 rounded' />
            <select value={searchType} onChange={handleSearchTypeChange} className='bg-transparent border-2 border-lime-400 rounded'>
                <option value='title'>title</option>
                <option value='author'>author</option>
            </select>
            <button onClick={handleSearch} className='bg-transparent border-2 border-lime-400 rounded'>search</button>
            </div>

                <div className='text-center p-10'>
                     
                    <div className='bg-lime-400 inline-block p-10 rounded'>
                       
                        {searchResults.map((result, index) => (
                            <div className='p-5'>
                            <div key={index} className='p-5 border-2 border-gray-700 border-dotted rounded'>
                                <h2 className='text-xl text-gray-500'>{result.title} by {result.author}</h2><br />

                    <p className='text-gray-500 m-7'>{result.lines.map((line, index) => (
                  <React.Fragment key={index}>
                      {line} <br/>
                      </React.Fragment>
                    ))}
                    </p>
                            </div>
                            </div>
                        ))}
                            
                    </div>
              
              
             

            </div>
        </div>
            </>
        
  
        
    );
}

export default Search