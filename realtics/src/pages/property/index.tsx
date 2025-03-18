import { useNavigate, useParams } from 'react-router-dom';
import GradientBackground from '../../components/gradientBackground';
import '../../styles/property/index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProperty } from '../../../Interfaces';
import { organizeFloorplans } from '../../utils';
// import { useState, useEffect, useRef } from 'react';

export default function Property() {
  const params = useParams();
  console.log(params.propertyName);
  const propertyName = params.propertyName;
  const [propertyInfo, setPropertyInfo] = useState<IProperty | undefined>(Object);
  const navigate = useNavigate();
  let allFloorplansOrganized;

  useEffect(() => {
    const getPropertyInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/property/${propertyName}`);
        if (response.data) {
          setPropertyInfo(response.data);
        } else {
          setPropertyInfo(undefined);
        }
      } catch (e) {
        console.error(e);
      }
    }

    getPropertyInfo();
  }, [])

  console.log(propertyInfo)

  const handleClick = () => {
    navigate(-1);
  }

  if (propertyInfo?.floorplans) {
    allFloorplansOrganized = organizeFloorplans(propertyInfo?.floorplans)
    console.log(allFloorplansOrganized);
  }

  return (
    <>
      <GradientBackground />
      <button onClick={handleClick} className='backButton'>Back</button>
      {propertyInfo === null ?
        <div id='errorContainer'>
        <div id='errorTitle'>Property not found!</div>
        <a href='/' className='idvPropertyLink'>
          <p className='idvPropertyP'>Back to Search</p>
        </a>
      </div>
    : <div id='allPropertyInfo'>
        <div id='propertyDisplayContainer'>
          <div id='propertyIntro'>
            <p id='propertyIntroTitle'>{propertyInfo?.propertyName}</p>
          </div>
          <div id='propertyStats'>
            <p>Hello</p>
          </div>
        </div>
        <div id='floorplanContainer'>
            <div className='labelContainer'>
              <p className='labelText'>Floorplans</p>
            </div>
            <div id='allFloorplans'>
              {!allFloorplansOrganized ? 
              <div id='error'>
                <p>No floorplans found!</p>
              </div>
              :
              Object.entries(allFloorplansOrganized).map(([key, value]) => {
                return (
                  <div className='bedContainer' key={key}>
                    <div className='bedLabel'>{key}</div>
                    {value.map((floorplan) => {
                      return (
                        <div className='idvFloorplan'>
                          <p>{floorplan.beds}</p>
                          <p>{floorplan.baths}</p>
                        </div>
                      )
                    })}
                  </div>
                )
              })
            }
            </div>
          </div>
      </div>
      }

    </>
  )
}