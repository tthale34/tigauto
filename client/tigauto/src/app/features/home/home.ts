import { Component, inject, Inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Car } from '../../core/services/car';
import {
  FormsModule
} from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

//  private readonly carService =
//     inject(CarService);

private readonly carService = inject(Car);

  readonly cars =
    this.carService.getFeaturedCars();

  readonly makes = [
    'Toyota',
    'Volkswagen',
    'Ford',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Hyundai',
    'Nissan'
  ];

  readonly provinces = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape'
  ];

  searchTerm = '';

  selectedMake = '';

  selectedProvince = '';

  minPrice: number | null = null;

  maxPrice: number | null = null;

  minYear: number | null = null;

  maxYear: number | null = null;

  minMileage: number | null = null;

  maxMileage: number | null = null;

  get filteredCars() {

    return this.cars.filter(car => {

      const search =
        this.searchTerm
          .trim()
          .toLowerCase();

      const matchesSearch =
        !search ||
        `${car.make} ${car.model} ${car.variant}`
          .toLowerCase()
          .includes(search);

      const matchesMake =
        !this.selectedMake ||
        car.make === this.selectedMake;

      const matchesProvince =
        !this.selectedProvince ||
        car.province === this.selectedProvince;

      const matchesMinPrice =
        this.minPrice === null ||
        car.price >= this.minPrice;

      const matchesMaxPrice =
        this.maxPrice === null ||
        car.price <= this.maxPrice;

      const matchesMinYear =
        this.minYear === null ||
        car.year >= this.minYear;

      const matchesMaxYear =
        this.maxYear === null ||
        car.year <= this.maxYear;

      const matchesMinMileage =
        this.minMileage === null ||
        car.mileage >= this.minMileage;

      const matchesMaxMileage =
        this.maxMileage === null ||
        car.mileage <= this.maxMileage;

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

  resetSearch(): void {

    this.searchTerm = '';

    this.selectedMake = '';

    this.selectedProvince = '';

    this.minPrice = null;
    this.maxPrice = null;

    this.minYear = null;
    this.maxYear = null;

    this.minMileage = null;
    this.maxMileage = null;
  }

  searchCars(): void {

    document
      .getElementById('featured')
      ?.scrollIntoView({
        behavior: 'smooth'
      });
  }
}
