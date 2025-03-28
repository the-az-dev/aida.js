import {Routes} from "../globals";
import {IncomingMessage, ServerResponse} from "http";

export function GET(path: string){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Routes.set(`${target.constructor.name}${path}`, async (req: IncomingMessage, res: ServerResponse) => {
            try {
                const result = await descriptor.value.call(target);

                if (typeof result === "object") {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(result));
                } else {
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end(String(result));
                }
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }
}

export function POST(path: string, consumes: string = "application/json") {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Routes.set(`${target.constructor.name}${path}`, async (req: IncomingMessage, res: ServerResponse) => {

            if(req.method !== "POST") {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported request method. Available POST method only!` }));
                return;
            }

            const requestContentType = req.headers["content-type"] || "";

            if (consumes !== "*/*" && !requestContentType.includes(consumes)) {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported Content-Type. Expected ${consumes}` }));
                return;
            }

            try {
                let body = "";

                req.on("data", chunk => (body += chunk));
                req.on("end", async () => {
                    try {
                        const parsedBody = consumes === "application/json" ? JSON.parse(body || "{}") : body;
                        const result = await descriptor.value.call(target, parsedBody);

                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(typeof result === "object"
                            ? JSON.stringify(result)
                            : String(result));
                    } catch (error) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid content or format" }));
                    }
                });
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    };
}

export function PUT(path: string, consumes: string = "application/json"){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        Routes.set(`${target.constructor.name}${path}`, async (req: IncomingMessage, res: ServerResponse) => {

            if(req.method !== "PUT") {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported request method. Available PUT method only!` }));
                return;
            }

            const requestContentType = req.headers["content-type"] || "";

            if (consumes !== "*/*" && !requestContentType.includes(consumes)) {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported Content-Type. Expected ${consumes}` }));
                return;
            }

            try {
                let body = "";

                req.on("data", chunk => (body += chunk));
                req.on("end", async () => {
                    try {
                        const parsedBody = consumes === "application/json" ? JSON.parse(body || "{}") : body;
                        const result = await descriptor.value.call(target, parsedBody);

                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(typeof result === "object"
                            ? JSON.stringify(result)
                            : String(result));
                    } catch (error) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid content or format" }));
                    }
                });
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }
}

export function PATCH(path: string, consumes: string = "application/json"){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        Routes.set(`${target.constructor.name}${path}`, async (req: IncomingMessage, res: ServerResponse) => {

            if(req.method !== "PATCH") {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported request method. Available PATCH method only!` }));
                return;
            }

            const requestContentType = req.headers["content-type"] || "";

            if (consumes !== "*/*" && !requestContentType.includes(consumes)) {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported Content-Type. Expected ${consumes}` }));
                return;
            }

            try {
                let body = "";

                req.on("data", chunk => (body += chunk));
                req.on("end", async () => {
                    try {
                        const parsedBody = consumes === "application/json" ? JSON.parse(body || "{}") : body;
                        const result = await descriptor.value.call(target, parsedBody);

                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(typeof result === "object"
                            ? JSON.stringify(result)
                            : String(result));
                    } catch (error) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid content or format" }));
                    }
                });
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }
}

export function DELETE(path: string, consumes: string = "application/json"){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        Routes.set(`${target.constructor.name}${path}`, async (req: IncomingMessage, res: ServerResponse) => {

            if(req.method !== "DELETE") {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported request method. Available DELETE method only!` }));
                return;
            }

            const requestContentType = req.headers["content-type"] || "";

            if (consumes !== "*/*" && !requestContentType.includes(consumes)) {
                res.writeHead(415, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: `Unsupported Content-Type. Expected ${consumes}` }));
                return;
            }

            try {
                let body = "";

                req.on("data", chunk => (body += chunk));
                req.on("end", async () => {
                    try {
                        const parsedBody = consumes === "application/json" ? JSON.parse(body || "{}") : body;
                        const result = await descriptor.value.call(target, parsedBody);

                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(typeof result === "object"
                            ? JSON.stringify(result)
                            : String(result));
                    } catch (error) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid content or format" }));
                    }
                });
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    };
}