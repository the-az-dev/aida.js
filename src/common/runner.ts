import { createServer } from "http";
import { Routes } from "./globals";
import {initializeRoutes} from "./init";
import log from "./utils/logger";

export default function startServer(port: number = 3000) {
    initializeRoutes();
    const server = createServer((req, res) => {
        if (!req.url) return;

        const routeHandler = Routes.get(req.url);
        if (routeHandler) {
            routeHandler(req, res);
            log(`${req.method} - ${req.url} : ${res.statusCode}`);
        } else {
            log.asTrace(`Requests mapping not found at project`);
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Requests_mapping not found" }));
        }
    });

    server.listen(port, () => {

    });
}