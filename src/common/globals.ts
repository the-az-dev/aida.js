import * as uWS from "uWebSockets.js";

export const LoggerHistory: { date: Date; log: string }[] = [];
export const ServerApp: uWS.TemplatedApp = uWS.App();
export const serviceContainer = new Map<string, any>();
export const middlewareContainer = new Map<string, any>();