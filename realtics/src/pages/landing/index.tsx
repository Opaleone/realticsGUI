import '../../styles/landing/index.css';
import { useState, useEffect, useRef } from 'react';
import GradientBackground from '../../components/gradientBackground';
import { formatCity } from '../../utils/index';
import { useNavigate } from 'react-router-dom';

const locationRegex = /^([a-z]-?){1,40}[-]{1}?([a-z]){1,2}$/g;

export default function Landing() {
  const [searchValue, setSearchValue] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState('');
  const isFocused = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Realtics';

    (async () => {
      const cities = ['austin-tx', 'round-rock-tx', 'georgetown-tx', 'cedar-park-tx', 'buda-tx', 'pflugerville-tx', 'leander-tx', 'hutto-tx', 'dripping-springs-tx'];
      while (true) {
        for (let i = 0; i < cities.length; i++) {
          if (isFocused.current) setPlaceholderValue('');
          const curCity = cities[i].split('');
          let text = '';
  
          for (let j = 0; j < curCity.length; j++) {
            if (isFocused.current) setPlaceholderValue('');
            await new Promise(res => setTimeout(res, 75));
            text += curCity[j];
            setPlaceholderValue(text);
          }
  
          if (isFocused.current) setPlaceholderValue('');
          await new Promise(res => setTimeout(res, 2000));
          let textRemoval = text.split('');
  
          for (let j = 0; j < text.length; j++) {
            if (isFocused.current) setPlaceholderValue('');
            await new Promise(res => setTimeout(res, 75));
            textRemoval.pop();
            setPlaceholderValue(textRemoval.join(''));
          }
        }
      }
    })();
  }, [searchValue.length]);

  const handleFocus = () => {
    isFocused.current = true;
    console.log('Set to true')
  };

  const handleBlur = () => {
    isFocused.current = false;
    console.log('Set to false')
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!locationRegex.test(searchValue)) {
      alert('Incorrect value format. Try again!');
      return;
    }

    const cityArr = formatCity(searchValue);

    navigate(`/city/${cityArr[0].toLowerCase()}-${cityArr[1].toLowerCase()}`);
  }

  return (
    <div className="App">
      <GradientBackground />
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
