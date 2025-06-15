import { Router } from 'express';
import { search, insert, update, remove } from '../api/UserApi'
import { validate } from '../api/AuthApi'; 

const route = '/user'

export default (router: Router): void => {
  router
    .route(route)
    .get(validate, search)
    .post(validate, insert);

  router
    .route(`${route}/:id`)
    .patch(validate, update)
    .delete(validate, remove);
};