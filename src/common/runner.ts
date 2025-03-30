import log from "./utils/logger";
import { ServerApp } from './globals';

export default function startServer(port: number = 3000) {
    ServerApp.listen(port, (token: any) => {
        if (token) {
            console.log('Сервер запущено на порту 3000');
        } else {
            console.log('Не вдалося запустити сервер');
        }
    });
}