export type AppState = {
  sales: Sale[];
  salesPeriod: Period | null;
};

export type Sale = {
  platform: string;
  releaseYear: number;
  genre: string;
  name: string;
  publisher: string;
  naSales: number;
  euSales: number;
  jpSales: number;
  otherSales: number;
  globalSales: number;
  // The following properties aren't always filled in the dataset, so they aren't accurate
  criticScore?: number;
  criticCount?: number;
  userScore?: number;
  userCount?: number;
  developer?: string;
  rating?: string;
};

export type SaleCSV = {
  [key: string]: string;
};

export type PlataformsSales = {
  [key: string]: number;
};

export type GenresSales = {
  [key: string]: number;
};

export type RegionsSales = {
  eu: number;
  northAmerica: number;
  japan: number;
  others: number;
};

export type SalesSummary = {
  sales: Sale[];
  totalSold: number;
};

export type Period = {
  begin: number;
  end: number;
};

export type SalesRegion =
  | "naSales"
  | "euSales"
  | "jpSales"
  | "otherSales"
  | "globalSales";
