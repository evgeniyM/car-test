## Description

Car test propject.

This is simple implementation of the task due to limited time. Only reqiured routes was made. It could be futher improved by adding pagination and filters to the list routes. 
Also `/cars` routes could be extended to add and return `owners` of the cars. Since services and controllers are simple I didn't implement unit tests for them, instead I've made integration tests for main logic. These tests also could be improved by adding more test cases.
Also it would be good to add swagger file, and add support of config files with validation using for example `convict` lib.

## Routes

```
GET /manufacturers - list manufacturers
POST /manufacturers - create a manufacturer
- name

GET /owners - list owners
POST /owners - create an owner
- name
- purchaseDate

GET /cars - list cars
POST /cars - create a car
- price
- firstRegistartionDate
- manufacturerId

GET /cars/:id/manufacturer - get car manufacturer
POST /task - run task
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## License

  Nest is [MIT licensed](LICENSE).
