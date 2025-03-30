import {log} from "./index";

export default function executeMiddlewares(middlewares: any[], res: any, req: any, handler: () => void) {
    let index = 0;

    function next() {
        if (index < middlewares.length) {
            const MiddlewareClass = middlewares[index];
            index++;
            new MiddlewareClass().handle(res, req, next);
        } else {
            handler();
        }
    }

    next();
}