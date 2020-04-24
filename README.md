## Description

Car test propject

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
