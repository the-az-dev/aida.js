import { ServerApp } from "../globals";
import {executeMiddlewares, log} from "../utils";

export default function Controller(basePath: string): ClassDecorator {
    return function (constructor: any) {
        const prototype = constructor.prototype;
        const controllerInstance = new constructor(); // Створюємо екземпляр


        if (!prototype.routes) {
            console.error(`[ERROR] No routes found in ${constructor.name}`);
            return;
        }

        prototype.routes.forEach((route: any) => {
            const fullPath = `${basePath}${route.path}`;

            const controllerMiddlewares: Array<any> = constructor.middlewares || [];
            const routeMiddlewares: Array<any> = constructor.routeMiddlewares?.get(route.propertyKey) || [];

            const middlewares = [];

            middlewares.push(...controllerMiddlewares);
            middlewares.push(...routeMiddlewares);


            const routeHandler = prototype[route.propertyKey];

            if (typeof routeHandler !== "function") {
                console.error(`[ERROR] Method ${route.propertyKey} is not a function in ${constructor.name}`);
                return;
            }

            ServerApp[route.method](fullPath, (res: any, req: any) => {
                executeMiddlewares([...controllerMiddlewares, ...routeMiddlewares], res, req, async () => {
                    try {
                        routeHandler.call(controllerInstance, res, req);
                    } catch (err) {
                        console.error(`[ERROR] Route ${fullPath} crashed:`, err);
                        if (!res.aborted) res.writeStatus("500 Internal Server Error").end("Internal Server Error", true);
                    }
                });
            });
        });
    };
}
