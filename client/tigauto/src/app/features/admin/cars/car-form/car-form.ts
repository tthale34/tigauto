import { Component,  inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { Car } from '../../../../core/services/car';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm 

 implements OnInit {

  private readonly fb =
    inject(FormBuilder);

  private readonly carService =
    inject(Car);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  carId: number | null = null;

  /**
   * Images that belong to the vehicle.
   *
   * These can be:
   * - Existing asset paths
   * - Newly selected local images
   */
  vehicleImages: string[] = [];

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


  readonly form =
    this.fb.nonNullable.group({

      make: [
        '',
        Validators.required
      ],

      model: [
        '',
        Validators.required
      ],

      variant: [
        '',
        Validators.required
      ],

      year: [
        new Date().getFullYear(),
        Validators.required
      ],

      price: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      mileage: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      province: [
        '',
        Validators.required
      ],

      city: [
        '',
        Validators.required
      ],

      fuelType: [
        'Petrol',
        Validators.required
      ],

      transmission: [
        'Automatic',
        Validators.required
      ],

      engineSize: [
        ''
      ],

      colour: [
        ''
      ],

      image: [
        ''
      ],

      description: [
        '',
        Validators.required
      ],

      isFeatured: [
        false
      ],

      isAvailable: [
        true
      ]

    });


  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap
        .get('id');

    if (!id) {
      return;
    }

    this.carId =
      Number(id);

    const car =
      this.carService
        .getCarById(
          this.carId
        );

    if (!car) {
      return;
    }

    this.vehicleImages =
      car.images;

    this.form.patchValue({

      make:
        car.make,

      model:
        car.model,

      variant:
        car.variant,

      year:
        car.year,

      price:
        car.price,

      mileage:
        car.mileage,

      province:
        car.province,

      city:
        car.city,

      fuelType:
        car.fuelType,

      transmission:
        car.transmission,

      engineSize:
        car.engineSize,

      colour:
        car.colour,

      image:
        car.images[0] ?? '',

      description:
        car.description,

      isFeatured:
        car.isFeatured,

      isAvailable:
        car.isAvailable

    });
  }


  get isEditMode(): boolean {

    return this.carId !== null;
  }

   /**
   * Select one or more images
   * from the user's computer.
   */
  onImagesSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const files =
      Array.from(input.files);

    for (const file of files) {

      /*
       * Only allow image files.
       */
      if (!file.type.startsWith('image/')) {
        continue;
      }

      const reader =
        new FileReader();

      reader.onload = () => {

        const result =
          reader.result;

        if (
          typeof result === 'string'
        ) {

          this.vehicleImages.push(
            result
          );

        }

      };

      reader.readAsDataURL(file);
    }

    /*
     * Allows the same file to be
     * selected again later.
     */
    input.value = '';
  }

  /**
   * Remove an image from the vehicle.
   */
  removeImage(
    index: number
  ): void {

    this.vehicleImages.splice(
      index,
      1
    );
  }


  /**
   * Make an image the main image.
   */
  setMainImage(
    index: number
  ): void {

    if (index === 0) {
      return;
    }

    const image =
      this.vehicleImages[index];

    this.vehicleImages.splice(
      index,
      1
    );

    this.vehicleImages.unshift(
      image
    );
  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const value =
      this.form.getRawValue();

       /*
     * If the admin doesn't select
     * an image, use the default image.
     */

    const images =
      this.vehicleImages.length > 0
        ? [...this.vehicleImages]
        : [
            '/assets/cars/hero-car.jpg'
          ];


    if (this.carId !== null) {

      this.carService.updateCar({

        id:
          this.carId,

        make:
          value.make,

        model:
          value.model,

        variant:
          value.variant,

        year:
          value.year,

        price:
          value.price,

        mileage:
          value.mileage,

        province:
          value.province,

        city:
          value.city,

        fuelType:
          value.fuelType,

        transmission:
          value.transmission,

        engineSize:
          value.engineSize,

        colour:
          value.colour,

        description:
          value.description,

        images,

        isFeatured:
          value.isFeatured,

        isAvailable:
          value.isAvailable

      });

    }
    else {

      this.carService.addCar({

        make:
          value.make,

        model:
          value.model,

        variant:
          value.variant,

        year:
          value.year,

        price:
          value.price,

        mileage:
          value.mileage,

        province:
          value.province,

        city:
          value.city,

        fuelType:
          value.fuelType,

        transmission:
          value.transmission,

        engineSize:
          value.engineSize,

        colour:
          value.colour,

        description:
          value.description,

        images,

        isFeatured:
          value.isFeatured,

        isAvailable:
          value.isAvailable

      });
    }

    this.router.navigate([
      '/admin/cars'
    ]);
  }

}
