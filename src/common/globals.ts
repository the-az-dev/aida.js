import { IncomingMessage, ServerResponse } from "http";

export const RegisteredControllers: { path: string; instance: any }[] = [];
export const Routes = new Map<string, (req: IncomingMessage, res: ServerResponse) => void>();
export const LoggerHistory: { date: Date; log: string }[] = [];