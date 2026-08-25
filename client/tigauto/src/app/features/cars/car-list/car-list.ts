import { Component, inject, Inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Car } from '../../../core/services/car';

import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-car-list',
  imports: [
    DecimalPipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
})
export class CarList {

 private readonly carService =
    inject(Car);

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

  get cars() {

    return this.carService.searchCars({
      search: this.searchTerm,
      make: this.selectedMake,
      province: this.selectedProvince,

      minPrice: this.minPrice,
      maxPrice: this.maxPrice,

      minYear: this.minYear,
      maxYear: this.maxYear,

      minMileage: this.minMileage,
      maxMileage: this.maxMileage
    });

  }

  resetFilters(): void {

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

}