import { useParams } from 'react-router-dom';
import GradientBackground from '../../components/gradientBackground';
import '../../styles/property/index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProperty } from '../../../Interfaces';
// import { useState, useEffect, useRef } from 'react';

export default function Property() {
  const params = useParams();
  console.log(params.propertyName);
  const propertyName = params.propertyName;
  const [propertyInfo, setPropertyInfo] = useState<IProperty | undefined>(Object)

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

  return (
    <>
      <GradientBackground />
    </>
  )
}