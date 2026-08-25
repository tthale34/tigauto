import {
  Component,
  inject
} from '@angular/core';

import {
  DecimalPipe
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { Car } from '../../../core/services/car';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './car-details.html',
  styleUrl: './car-details.scss'
})
export class CarDetails {

  private readonly route =
    inject(ActivatedRoute);

  private readonly carService =
    inject(Car);

  selectedImage = '';

  readonly car = this.loadCar();

  private loadCar() {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const car =
      this.carService.getCarById(id);

    if (car && car.images.length > 0) {
      this.selectedImage =
        car.images[0];
    }

    return car;
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

}
