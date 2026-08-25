import { Component,  inject
} from '@angular/core';

import {
  DecimalPipe
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import { Car } from '../../../../core/services/car';
import { CarModel } from '../../../../core/models/car.model';

@Component({
  selector: 'app-admin-car-list',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-car-list.html',
  styleUrl: './admin-car-list.scss',
})
export class AdminCarList {

private readonly carService =
    inject(Car);

  searchTerm = '';

  get cars(): CarModel[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    return this.carService
      .getCars()
      .filter(car =>

        !search ||

        `${car.make} ${car.model} ${car.variant}`
          .toLowerCase()
          .includes(search)

      );
  }


  deleteCar(car: CarModel): void {

    const confirmed =
      window.confirm(
        `Delete ${car.year} ${car.make} ${car.model}?`
      );

    if (!confirmed) {
      return;
    }

    this.carService.deleteCar(
      car.id
    );
  }

}