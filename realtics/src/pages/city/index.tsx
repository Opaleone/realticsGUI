import { useParams } from 'react-router-dom';
import GradientBackground from '../../components/gradientBackground';
import '../../styles/city/index.css';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { ICityModel, IProperty } from '../../../Interfaces';
import { formatCity } from '../../utils';

export default function City() {
  const params = useParams();
  const [cityData, setCityData] = useState<ICityModel | null>(Object);
  const cityArr = formatCity(params.nameAndState);

  useEffect(() => {
    const getCityData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/city/${cityArr[0]}/${cityArr[1]}`);
        console.log(response);
        if (!Object.keys(response.data).length) setCityData(null);
        else setCityData(response.data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };
  
    getCityData();
  }, []);

  useEffect(() => {
    console.log(cityData);
  }, []);

  return (
    <>
      <GradientBackground />
      {cityData === null ? 
        <div id='errorContainer'>
          <div id='errorTitle'>{cityArr[0]}, {cityArr[1]} not found!</div>
          <a href='/' className='idvPropertyLink'>
            <p className='idvPropertyP'>Back to Search</p>
          </a>
        </div>
      : <div id='allCityInfo'>
      <div id='cityDisplayContainer'>
        <div id='cityIntro'>
          <p id='cityIntroTitle'>{cityData?.cityName}, {cityData?.state}</p>
        </div>
        <div id='cityStats'>
          <p>Hello</p>
        </div>
      </div>
      <div id='cityLinkContainer'>
        <div className='labelContainer'>
          <p className='labelText'>Properties</p>
        </div>
        <div id='allProperties'>
          {cityData?.properties?.map((property: IProperty) => {
            return (
              <a key={'propLink' + property.propertyName} href={'/property/' + property.propertyName} className='idvPropertyLink'>
                <p key={'iP:' + property.propertyName} className='idvPropertyP'>{property.propertyName + '\n'}</p>
              </a>
            )
          })}
        </div>
      </div>
    </div>
      }
    </>
  )
}