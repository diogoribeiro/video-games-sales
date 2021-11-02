export type SalesInfo = {
  [key:string]: string
}

export type PlataformsSales = {
  [key:string]: number
}

export type GenresSales = {
  [key:string]: number
}

export type SalesSummary = {
  sales: SalesInfo[],
  totalSold: number,
}