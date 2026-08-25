import { Component, inject
} from '@angular/core';

import {
  DecimalPipe
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import { Car } from '../../../core/services/car';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ 
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

 private readonly carService =
    inject(Car);

  get cars() {
    return this.carService.getCars();
  }

  get totalCars(): number {
    return this.cars.length;
  }

  get availableCars(): number {

    return this.cars.filter(
      car => car.isAvailable
    ).length;
  }

  get featuredCars(): number {

    return this.cars.filter(
      car => car.isFeatured
    ).length;
  }

  get totalStockValue(): number {

    return this.cars.reduce(
      (total, car) =>
        total + car.price,
      0
    );
  }

  get recentCars() {

    return this.cars.slice(0, 5);
  }
}
