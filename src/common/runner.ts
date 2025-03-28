import { createServer } from "http";
import { Routes } from "./globals";
import {initializeRoutes} from "./init";

export default function startServer(port: number = 3000) {
    initializeRoutes();
    const server = createServer((req, res) => {
        if (!req.url) return;

        const routeHandler = Routes.get(req.url);
        if (routeHandler) {
            routeHandler(req, res);
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Requests_mapping not found" }));
        }
    });

    server.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
}