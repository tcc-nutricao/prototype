import { Router } from 'express';
import { login } from '../api/AuthApi'

const route = '/auth';

export default (router: Router): void => {
    router.post(`${route}/login`, login)
}
