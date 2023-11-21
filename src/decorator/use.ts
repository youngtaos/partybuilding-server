import 'reflect-metadata';
import { RequestHandler } from 'express';
import { CrowllerController, LoginController, PeopleController } from '../controller';


export function use(middleware: RequestHandler) {
  return function (target: CrowllerController | LoginController | PeopleController, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key);
  };
}
