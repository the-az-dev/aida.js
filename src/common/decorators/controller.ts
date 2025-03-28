import {RegisteredControllers} from "../globals";

export default function Controller(basePath: string) {
    return function (constructor: any) {
        RegisteredControllers.push({ path: basePath, instance: new constructor() });
    };
}