import './App.css';
import Landing from './pages/landing/index';
import City from './pages/city';
import Property from './pages/property';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Landing} />
        <Route path='/city/:nameAndState' Component={City} />
        <Route path='/property/:propertyName' Component={Property} />
      </Routes>
    </BrowserRouter>
  )
}