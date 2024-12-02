import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { formatCity } from './utils/index';

const locationRegex = /^([a-z]-?){1,40}[-]{1}?([a-z]){1,2}$/g;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState('');
  const isFocused = useRef(false);

  useEffect(() => {
    document.title = 'Realtics';

    (async () => {
      const cities = ['austin-tx', 'round-rock-tx', 'georgetown-tx', 'cedar-park-tx', 'buda-tx', 'pflugerville-tx', 'leander-tx', 'hutto-tx', 'dripping-springs-tx'];
      for (let i = 0; i < cities.length; i++) {
        while (isFocused.current) {
          await new Promise(res => setTimeout(res, 100));
        }
        const curCity = cities[i].split('');
        let text = '';

        for (let j = 0; j < curCity.length; j++) {
          await new Promise(res => setTimeout(res, 75));
          text += curCity[j];
          setPlaceholderValue(text);
        }

        await new Promise(res => setTimeout(res, 2000));
        let textRemoval = text.split('');

        for (let j = 0; j < text.length; j++) {
          while (isFocused.current) {
            await new Promise(res => setTimeout(res, 100));
          }
          await new Promise(res => setTimeout(res, 75));
          textRemoval.pop();
          setPlaceholderValue(textRemoval.join(''));
        }
      }
    })();
  }, [searchValue.length]);

  const handleFocus = () => {
    isFocused.current = true;
  };

  const handleBlur = () => {
    isFocused.current = false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!locationRegex.test(searchValue)) {
      alert('Incorrect value format. Try again!');
      return;
    }

    const cityArr = formatCity(searchValue);

    const cityData = await axios.get(`http://localhost:3001/api/city/${cityArr[0]}/${cityArr[1]}`);
    if (cityData.status === 404) {
      alert('No city found!');
    }

    console.log(cityData.data);
  }

  return (
    <div className="App">
      <div id="linearBackground"></div>
      <div id='searchContainer'>
        <header>
          <p id='title'>Realtics</p>
        </header>
        <form id='searchbarContainer' onSubmit={handleSubmit}>
          <input
            id='mainSearchBar' 
            type='text' 
            placeholder={placeholderValue}
            onChange={(e) => setSearchValue(e.target.value)} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onFocusCapture={e => e.target.select()}
            />
        </form>
      </div>
    </div>
  );
}

export default App;
