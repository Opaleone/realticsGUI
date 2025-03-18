import { IFloorPlan, IOrganizedFloorplans } from "../../Interfaces";

/**
 * Formats the city name for console log into one that's more human readable
 * 
 * I.E.
 *  Austin, TX
 * 
 * @param city - string 
 * @returns string
 */
export function formatCity(city: string | undefined): string[] {
  let formattedCity = '';
  const cityArr = city?.split('-');
  const state = cityArr?.pop()?.toUpperCase();

  if (cityArr?.length) {
    for (let i = 0; i < cityArr?.length; i++) {
      const wordArr = cityArr[i].split('');
      const firstLetter = wordArr[0].toUpperCase();
      const restOfWord = wordArr.slice(1);
  
      if (i === cityArr.length - 1) formattedCity += `${firstLetter}${restOfWord.join('')}`;
      else formattedCity += `${firstLetter}${restOfWord.join('')} `;
    }
  }

  return [formattedCity, state ? state : ''];
}

export function organizeFloorplans(floorplans: IFloorPlan[]): IOrganizedFloorplans | null {
  let organizedFloorplans: IOrganizedFloorplans = {};

  for (let i = 0; i < floorplans.length; i++) {
    const bedCount = floorplans[i].beds;

    if (organizedFloorplans[bedCount]) {
      organizedFloorplans[bedCount].push(floorplans[i]);
    } else {
      organizedFloorplans[bedCount] = [];
      organizedFloorplans[bedCount].push(floorplans[i]);
    }
  }

  return organizedFloorplans;
}