import { useParams } from 'react-router-dom';
import GradientBackground from '../../components/gradientBackground';
import '../../styles/city/index.css';
import axios from 'axios';
import { useState, useEffect} from 'react';

export default function City() {
  const params = useParams();
  const [cityData, setCityData] = useState(Object);

  useEffect(() => {
    const getCityData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/city/${params.cityName}/${params.state}`
        );
        setCityData(response.data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };
  
    getCityData();
  }, [params.cityName, params.state]);

  useEffect(() => {
    console.log(cityData);
  }, [cityData]);

  return (
    <>
      <GradientBackground />
      <h1>City Data</h1>
      <pre>{JSON.stringify(cityData, null, 2)}</pre>
    </>
  )
}