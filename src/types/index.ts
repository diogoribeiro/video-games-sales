export type Sale = {
  platform: string,
  releaseYear: number,
  genre: string,
  name: string,
  publisher: string,
  naSales: number,
  euSales: number,
  jpSales: number,
  otherSales: number,
  globalSales: number,
  criticScore?: number, // not accurate
  criticCount?: number, // not accurate
  userScore?: number, // not accurate
  userCount?: number, // not accurate
  developer?: string, // not accurate
  rating?: string, // not accurate
}

export type SaleCSV = {
  [key:string]: string
}

export type PlataformsSales = {
  [key:string]: number
}

export type GenresSales = {
  [key:string]: number
}

export type RegionsSales = {
  eu: number
  northAmerica: number
  japan: number
  others: number
}

export type SalesSummary = {
  sales: Sale[],
  totalSold: number,
}

export type Period = {
  begin: number,
  end: number,
}