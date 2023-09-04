# Monthly

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

# App Plan
Managing and tracking a daily routing along with monthly and weekly goals and milestones
## Features
### Feature: Daily Routing
- A manageable schedule for a daily routine

### Feature: Annual Goals
- Highest level goals for the calendar year

### Feature: Monthly Goals
- Summary level goals for the month
### Feature: Weekly Goals
- Week by week goals for the current month

## Models
- Daily Routine Schedule Item (time, duration, description)
- Weekly Routine Schedule Item (day of week, description, status)
- Annual Goal (year, description, status)
- Monthly Goal (year, month, description, status)
- Weekly Goal (Start date of week, description, status)

## Services

- Routine Schedule Service - generally handles data operations for routine schedules
- Goal Service - generally handles data operations for goals

## Components
- Daily Routine
- Weekly Routine
- Annual Goals
- Monthly Goals
- Weekly Goals


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
