import { Injectable } from '@angular/core';
import { CarModel } from '../models/car.model';

export interface CarSearchFilters {
  search?: string;
  make?: string;
  province?: string;

  minPrice?: number | null;
  maxPrice?: number | null;

  minYear?: number | null;
  maxYear?: number | null;

  minMileage?: number | null;
  maxMileage?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class Car {

   private readonly storageKey = 'tigauto-cars';

  private cars: CarModel[] = [];

  private readonly defaultCars: CarModel[] = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      variant: '1.8 XS CVT',
      year: 2021,
      price: 289900,
      mileage: 45000,
      province: 'Gauteng',
      city: 'Johannesburg',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineSize: '1.8L',
      colour: 'White',
      description:
        'A well maintained Toyota Corolla with excellent fuel economy and a comfortable interior. Ideal for everyday driving and family use.',
      images: [
        'assets/cars/toyota-corolla.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    },

    {
      id: 2,
      make: 'Volkswagen',
      model: 'Polo',
      variant: '1.0 TSI Comfortline',
      year: 2020,
      price: 229900,
      mileage: 38000,
      province: 'Gauteng',
      city: 'Pretoria',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineSize: '1.0L',
      colour: 'Red',
      description:
        'A stylish and economical Volkswagen Polo with a comfortable interior and excellent performance.',
      images: [
        'assets/cars/vw-polo.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    },

    {
      id: 3,
      make: 'Ford',
      model: 'Ranger',
      variant: '2.2 TDCi XL 4x2',
      year: 2019,
      price: 259900,
      mileage: 72000,
      province: 'KwaZulu-Natal',
      city: 'Durban',
      fuelType: 'Diesel',
      transmission: 'Manual',
      engineSize: '2.2L',
      colour: 'White',
      description:
        'A dependable Ford Ranger designed for work, family and adventure. Well maintained and ready to go.',
      images: [
        'assets/cars/ford-ranger.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    },

    {
      id: 4,
      make: 'BMW',
      model: '3 Series',
      variant: '320i M Sport',
      year: 2022,
      price: 489900,
      mileage: 22000,
      province: 'Western Cape',
      city: 'Cape Town',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineSize: '2.0L',
      colour: 'Blue',
      description:
        'Premium BMW 3 Series with M Sport styling, modern technology and a refined driving experience.',
      images: [
        'assets/cars/bmw-3-series.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    },

    {
      id: 5,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      variant: 'C200 Avantgarde',
      year: 2021,
      price: 429900,
      mileage: 35000,
      province: 'Gauteng',
      city: 'Johannesburg',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineSize: '1.5L',
      colour: 'Black',
      description:
        'Elegant Mercedes-Benz C-Class offering luxury, comfort and modern technology.',
      images: [
        'assets/cars/mercedes-c-class.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    },

    {
      id: 6,
      make: 'Audi',
      model: 'A4',
      variant: '35 TFSI S Line',
      year: 2020,
      price: 379900,
      mileage: 48000,
      province: 'Gauteng',
      city: 'Sandton',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineSize: '2.0L',
      colour: 'Grey',
      description:
        'Audi A4 S Line combining premium comfort, performance and sophisticated styling.',
      images: [
        'assets/cars/audi-a4.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    },

    {
      id: 7,
      make: 'Hyundai',
      model: 'Tucson',
      variant: '2.0 Executive',
      year: 2022,
      price: 319900,
      mileage: 29000,
      province: 'Gauteng',
      city: 'Midrand',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineSize: '2.0L',
      colour: 'Silver',
      description:
        'Modern Hyundai Tucson SUV with spacious seating, comfort and excellent road presence.',
      images: [
        'assets/cars/hyundai-tucson.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    },

    {
      id: 8,
      make: 'Nissan',
      model: 'Navara',
      variant: '2.3D LE 4x4',
      year: 2021,
      price: 399900,
      mileage: 55000,
      province: 'Gauteng',
      city: 'Centurion',
      fuelType: 'Diesel',
      transmission: 'Automatic',
      engineSize: '2.3L',
      colour: 'White',
      description:
        'Powerful Nissan Navara 4x4 suitable for both work and recreational driving.',
      images: [
        'assets/cars/nissan-navara.jpg'
      ],
      isFeatured: true,
      isAvailable: true
    }
  ];

  constructor(){
    this.loadCars();
  }

   // ==============================
  // LOAD
  // ==============================

  private loadCars(): void {

    const storedCars =
      localStorage.getItem(this.storageKey);

    if (storedCars) {

      this.cars =
        JSON.parse(storedCars);

      return;
    }

    this.cars = [
      ...this.defaultCars
    ];

    this.saveCars();
  }

  // ==============================
  // SAVE
  // ==============================

  private saveCars(): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.cars)
    );
  }

  // getCars(): CarModel[] {
  //   return [...this.defaultCars];
  // }

   // ==============================
  // GET ALL
  // ==============================

  getCars(): CarModel[] {

    return [
      ...this.cars
    ];
  }

   // ==============================
  // GET FEATURED
  // ==============================
 getFeaturedCars(): CarModel[] {

    return this.cars.filter(
      car =>
        car.isFeatured &&
        car.isAvailable
    );
  }

  getCarById(
    id: number
  ): CarModel | undefined {

    return this.cars.find(
      car => car.id === id
    );
  }

  // ==============================
  // ADD
  // ==============================

  addCar(
    car: Omit<CarModel, 'id'>
  ): CarModel {

    const newCar: CarModel = {

      ...car,

      id: this.generateId()
    };

    this.cars = [
      newCar,
      ...this.cars
    ];

    this.saveCars();

    return newCar;
  }


  // ==============================
  // UPDATE
  // ==============================

  updateCar(
    updatedCar: CarModel
  ): void {

    this.cars =
      this.cars.map(car =>

        car.id === updatedCar.id
          ? updatedCar
          : car

      );

    this.saveCars();
  }


  // ==============================
  // DELETE
  // ==============================

  deleteCar(
    id: number
  ): void {

    this.cars =
      this.cars.filter(
        car => car.id !== id
      );

    this.saveCars();
  }


    // ==============================
  // SEARCH
  // ==============================
  searchCars(
    filters: CarSearchFilters
  ): CarModel[] {

    const search =
      filters.search
        ?.trim()
        .toLowerCase() ?? '';

    return this.cars.filter(car => {

      const matchesSearch =
        !search ||
        `${car.make} ${car.model} ${car.variant}`
          .toLowerCase()
          .includes(search);

      const matchesMake =
        !filters.make ||
        car.make === filters.make;

      const matchesProvince =
        !filters.province ||
        car.province ===
          filters.province;

      const matchesMinPrice =
        filters.minPrice == null ||
        car.price >=
          filters.minPrice;

      const matchesMaxPrice =
        filters.maxPrice == null ||
        car.price <=
          filters.maxPrice;

      const matchesMinYear =
        filters.minYear == null ||
        car.year >=
          filters.minYear;

      const matchesMaxYear =
        filters.maxYear == null ||
        car.year <=
          filters.maxYear;

      const matchesMinMileage =
        filters.minMileage == null ||
        car.mileage >=
          filters.minMileage;

      const matchesMaxMileage =
        filters.maxMileage == null ||
        car.mileage <=
          filters.maxMileage;

      return (
        matchesSearch &&
        matchesMake &&
        matchesProvince &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinYear &&
        matchesMaxYear &&
        matchesMinMileage &&
        matchesMaxMileage
      );
    });
  }

   // ==============================
  // ID
  // ==============================

  private generateId(): number {

    if (!this.cars.length) {
      return 1;
    }

    return Math.max(
      ...this.cars.map(
        car => car.id
      )
    ) + 1;
  }

  
}
