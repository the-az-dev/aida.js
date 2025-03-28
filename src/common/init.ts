import { RegisteredControllers, Routes } from "./globals";

export function initializeRoutes() {
    for (const { path, instance } of RegisteredControllers) {
        const className = instance.constructor.name;

        for (const [key, handler] of Routes) {
            if (key.startsWith(className)) {
                const newPath = `${path.includes('/') ? path : `/${path}`}${key.replace(className, "")}`;
                Routes.set(newPath, handler);
                Routes.delete(key);
            }
        }
    }
}
