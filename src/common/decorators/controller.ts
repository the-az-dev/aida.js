import {RegisteredControllers} from "../globals";
import log from "../utils/logger";

export default function Controller(basePath: string) {
    return function (constructor: any) {
        RegisteredControllers.push({ path: basePath, instance: new constructor() });
        log(`Initialized Controller: ${constructor.name} from base path: ${basePath}`);
    };
}

//
//         const controllersDir = path.resolve("./src/controllers");
//
//         // Отримуємо шлях до файлу, де викликано декоратор
//         const callerPath = path.resolve(currentFile, "../../controllers");
//
//         if (!callerPath.includes(controllersDir)) {
//             log.asTrace(`❌ Controller "${constructor.name}" знаходиться поза дозволеним шляхом! (${callerPath})`);
//             return;
//         }
//
//         RegisteredControllers.push({ path: basePath, instance: new constructor() });
//         log(`✅ Initialized Controller: ${constructor.name} from base path: ${basePath}`);