export function Route(path: string, method: string): MethodDecorator {
    return function (target: any, propertyKey: string | symbol) {
        if (!target.routes) {
            target.routes = [];
        }

        target.routes.push({ path, method, propertyKey });
    };
}
