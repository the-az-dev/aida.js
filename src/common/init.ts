import { RegisteredControllers, Routes } from "./globals";
import log from "./utils/logger";

export function initializeRoutes() {
    log(`Initializing routes`);
    for (const { path, instance } of RegisteredControllers) {
        const className = instance.constructor.name;

        for (const [key, handler] of Routes) {
            if (key.startsWith(className)) {
                const newPath = `${path.includes('/') ? path : `/${path}`}${key.replace(className, "")}`;
                Routes.set(newPath, handler);
                Routes.delete(key);
                log(`Route ${key} initialized by path - ${newPath}`);
            }
        }
    }
}
