import { serviceContainer } from "../globals";
import 'reflect-metadata';

export function Service(): ClassDecorator {
    return function (constructor: any) {
        serviceContainer.set(constructor.name, new constructor());
    };
}

export function Inject(): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const serviceName = Reflect.getMetadata('design:type', target, propertyKey).name;
        target[propertyKey] = serviceContainer.get(serviceName);
    };
}
