# Employees Crud

https://employee-test.netlify.com

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Configuration Files:
## tsconfig.json
`Path Alias:`

They are shortcuts for our files, with them we can implement imports in a more comfortable and short way.

```
"paths":{  
   "@src/*":[  
      "src/*"
   ],
   "@assets/*":[  
      "src/assets/*"
   ],
   "@shared/*":[  
      "src/app/shared/*"
   ]
}
```

## angular.json
`stylePreprocessorOptions:`

It expects a json with the following property “includePaths” that declares shortcuts for our style files in the same that path alias, the only difference is that it doesn’t need an “@” to use it on your scss files.

```
"stylePreprocessorOptions": {
   "includePaths": ["src/app/shared/styles"]
 },
```

Configurations:
Each one of the configurations available for our project to use on our compilation.

I recommend the following for development and production:

```
"configurations": {
            "local": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.local.ts"
                }
              ],
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": true,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": false,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            },
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
}
```

## Structure:
`Barrels:`

To organize our project imports we are going to use the concept of “Barrels”, the main idea is to add a file called “index.ts” to each one of our folders that contain ant .ts file. Inside of it we are going to export each exportable variable to the outside of all the .ts files creating this way a hidden hierarchy which is going to help us hiding long deep paths at our imports.

Example:
```
Index.ts inside “components” folder

export * from './component-folder-1';
export * from './component-folder-2';
Import at module

import { 
   Component1, 
   Component2, 
   Component3, 
   Component4 
} from './component-folder';
```
Please check that there are more components than the number of exports at the index.ts file, this is happening because inside of each one of those paths that we are exporting there are more index.ts files that are at the same time exporting more paths.

As you can see this is cleaner and at the same time easier to implement, we reduce the number of lines that we need to import files and also we are shortening paths.

`Main Structure:`
Apart from the app.module, app.component, etc. we are going to create a folder for each one of our modules, inside of it we are going to find the following structure:
```
-modules
-components
-interfaces
-services
-etc
```
The main idea is to separate logic by categories, each module containing its own, to reinforce the concept of lazy loading of modules where each one is going to be loaded at need and have to be independent of each other.

For those components, services, etc. that we need at more than one module (example: Angular material modules), we are going to create a “shared module” to import and export them across the app.

For shared services i recommend implementing them directly at the app.module, if we do it at the shared module we are creating a different instance of the service for each one of them, making impossible the communication using this service across the app.

`Core Service:`
The core or utility service file is a shared service implemented at the app.module that contains all the methods that can be reused across the app. Remember that each function has to be declarative, without side effects and has to return a value with the result, if you need to modify a parameter please create a variable with the value of it to do so.

`Spinner implementation:`
I recommend using an observable to implement an spinner, that can receive a boolean to show or hide it.

`core.service.ts`
```
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Subject } from 'rxjs';
export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  spinnerStatusState = new Subject<any>();


  constructor() {}


  displaySpinner(value: boolean) {
    this.spinnerStatusState.next(<LoaderState>{ show: value });
  }
}
  }
```
`app.component.ts`
```
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CoreService } from './shared/services/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  show = false;


  constructor(private coreService: CoreService) {}


  ngOnInit() {
    this.coreService.spinnerStatusState.subscribe(state => {
      setTimeout(() => {
        this.show = state.show;
      }, 0);
    });
  }
}
```
`app.component.html`
```
<ng-container><span *ngIf="show"><app-spinner></app-spinner></span>


  <app-navbar> <router-outlet></router-outlet> </app-navbar>
</ng-container>
spinner.component.ts

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-spinner',
  template: `
    <div class="loading"></div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  constructor() {}


  ngOnInit() {}
}
```


Implement your spinner scss to style your own or replace the template with a gif or other.

`How to use it:`

Inject the core service at your component’s constructor and before calling an endpoint do:
```
this.coreService.displaySpinner(true);
```
After the getting the result and even if it’s successful or not:
```
this.yourService.getInformation().subscribe(
  response => {
   ...
   this.coreService.displaySpinner(false);
  },
  error => {
   ...
   this.coreService.displaySpinner(false);
  }
);
```
`Observables:`

Combine the observables !!, there are sometime at your component that you are calling more than one endpoint at a time….instead of making a subscribe to each one of them why not just combining them ?.

I recommend using a combineLatest from rxjs to do it, these way even if some of the values don't come we are still going to enter the result or error of the subscribe and when the missing value comes we are going to maintain the last one.
```
import { combineLatest } from 'rxjs';

...

ngOnInit() {
  combineLatest(
    this.yourService.getObservable1(),
    this.yourService.getObservable2()
  ).subscribe(
    ([result1, result2]) = {
      ...
    }
  ) 
}
```
These way we can unsubscribe easier at the ngOnDestroy.

Recommendation for calling endpoints !!!!, if your know that your observable is going to get information from the back only once, use .pipe(first()) before you subscribe, this way it’s going to get the information and unsubscribe automatically.
```
import { first } from 'rxjs/operators';

...

this.yourService.getObservable().pipe(first()).subscribe(...);
```
