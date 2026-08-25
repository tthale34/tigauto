export interface CarModel {
  id: number;

  make: string;
  model: string;
  variant: string;

  year: number;
  price: number;
  mileage: number;

  province: string;
  city: string;

  fuelType: string;
  transmission: string;
  engineSize: string;
  colour: string;

  description: string;

  images: string[];

  isFeatured: boolean;
  isAvailable: boolean;
}