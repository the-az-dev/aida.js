import { middlewareContainer } from '../globals';
import {log} from "../utils";

export function Middleware(): ClassDecorator {
    return function (constructor: any) {
        middlewareContainer.set(constructor.name, new constructor());
    };
}

export function UseMiddleware(...middlewares: any[]): MethodDecorator & ClassDecorator {
    return function (target: any, propertyKey?: string | symbol) {
        if (propertyKey) {
            // Middleware для методу
            if (!target.routeMiddlewares) {
                target.routeMiddlewares = new Map();
            }
            target.routeMiddlewares.set(propertyKey, middlewares);
        } else {
            // Middleware для контролера
            target.middlewares = middlewares;
        }
    };
}
