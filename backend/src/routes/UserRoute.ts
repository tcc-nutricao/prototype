import { Router } from 'express';

const route = '/user'
const api = require('@/api/UserApi')
const auth = require('@/api/AuthApi')

export default (router: Router): void => {
  router
    .route(route)
    .get(auth.validate, api.search)
    .post(auth.validate, api.insert);

  router
    .route(`${route}/:id`)
    .patch(auth.validate, api.update)
    .delete(auth.validate, api.remove);
};