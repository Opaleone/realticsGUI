// Model types

/**
 * Only used within IFloorplan
 * ```ts
 * interface IDetails {
 *  price: string | undefined,
 *  sqFt: string | undefined,
 *  whenAvailable: string | undefined;
 * }
 * ```
 */
export interface IDetails {
  _id: string | undefined,
  price: string | undefined,
  sqFt: string | undefined,
  whenAvailable: string | undefined,
  _v: number | undefined
}
/**
 * Type definition for floorplan.
 * Used primarily within web scraper function.
 * 
 * ```ts
 * interface IFloorPlan {
 *  name: string | undefined,
 *  beds: string | undefined,
 *  baths: string | undefined,
 *  details: IDetails[]
 * }
 */
export interface IFloorPlan {
  _id: string | undefined,
  name: string | undefined,
  beds: string | undefined,
  baths: string | undefined,
  details: IDetails[]
  averages: IAverage[],
  _v: number | undefined
}
/**
 * Type definition for property object.
 * 
 * ```ts
 * interface IProperty {
 *  propertyName: string | undefined,
 *  address: string | undefined
 *  floorPlans: IFloorPlan[]
 * }
 * ```
 */
export interface IProperty {
  _id: string | undefined,
  propertyName: string | undefined,
  address: string | undefined,
  phone: string | undefined,
  leasingOffice: string | undefined
  floorplans: IFloorPlan[],
  uniqueFeatures: string[]
  _v: number | undefined
}
/**
 * Type definition for Average object
 * ```ts
 * interface IAverage {
 *  floorplanName: string | undefined,
 *  beds: string | undefined,
 *  baths: string | undefined,
 *  averages: any[]
 * }
 * ```
 */
export interface IAverage {
  _id: string | undefined,
  price: number,
  sqFt: string,
  whenAvailable: string,
  _v: number | undefined

}

export interface ICityModel {
  _id: string | undefined
  cityName: string | undefined,
  state: string | undefined,
  properties: IProperty[],
  refresh: number,
  _v: number | undefined
}