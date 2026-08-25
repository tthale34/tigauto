import { Routes } from '@angular/router';
import { adminAuthGuard } from './core/guards/admin-auth-guard';

export const routes: Routes = [

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  {
    path: 'admin/login',

    loadComponent: () =>
      import(
        './features/admin/login/login'
      ).then(
        component =>
          component.Login
      )
  },


  // ==========================================
  // ADMIN
  // ==========================================

  {
    path: 'admin',

    // Protect the entire Admin section
    canActivate: [
      adminAuthGuard
    ],

    loadComponent: () =>
      import(
        './features/admin/admin-layout/admin-layout'
      ).then(
        component =>
          component.AdminLayout
      ),

    children: [

      // /admin
      {
        path: '',

        loadComponent: () =>
          import(
            './features/admin/dashboard/dashboard'
          ).then(
            component =>
              component.Dashboard
          )
      },


      // /admin/cars
      {
        path: 'cars',

        loadComponent: () =>
          import(
            './features/admin/cars/admin-car-list/admin-car-list'
          ).then(
            component =>
              component.AdminCarList
          )
      },


      // /admin/cars/add
      {
        path: 'cars/add',

        loadComponent: () =>
          import(
            './features/admin/cars/car-form/car-form'
          ).then(
            component =>
              component.CarForm
          )
      },


      // /admin/cars/edit/:id
      {
        path: 'cars/edit/:id',

        loadComponent: () =>
          import(
            './features/admin/cars/car-form/car-form'
          ).then(
            component =>
              component.CarForm
          )
      }

    ]
  },


  // ==========================================
  // PUBLIC WEBSITE
  // ==========================================

  {
    path: '',

    loadComponent: () =>
      import(
        './shared/components/public-layout/public-layout'
      ).then(
        component =>
          component.PublicLayout
      ),

    children: [

      // /
      {
        path: '',

        loadComponent: () =>
          import(
            './features/home/home'
          ).then(
            component =>
              component.Home
          )
      },


      // /cars
      {
        path: 'cars',

        loadComponent: () =>
          import(
            './features/cars/car-list/car-list'
          ).then(
            component =>
              component.CarList
          )
      },


      // /cars/:id
      {
        path: 'cars/:id',

        loadComponent: () =>
          import(
            './features/cars/car-details/car-details'
          ).then(
            component =>
              component.CarDetails
          )
      }

    ]
  },


  // ==========================================
  // FALLBACK
  // ==========================================

  {
    path: '**',
    redirectTo: ''
  }

];