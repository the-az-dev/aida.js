import {Controller, Route, startServer, Service, Inject, Middleware, UseMiddleware} from '../common';
import {enhanceRes} from "../common/utils";

@Middleware()
export class LoggerMiddleware {
    async handle(res: any, req: any, next: () => void) {
        const authToken: String = req.getHeader('ath');
        if(!authToken.includes('123')){
            const error = JSON.stringify({
                status: 'forbidden',
                statusText: 'Token invalid',
            });
            await res.writeStatus('403').writeHeader('Content-Type', 'application/json').end(error);
        }
        next();
    }
}

@Service()
export class UserService {
    getUsers() {
        return [{ id: 1, name: 'John Doe' }];
    }
}


@Controller('/users')
@UseMiddleware(LoggerMiddleware)
export class UserController {

    @Inject()
    private userService: UserService;

    @Route('', 'get')
    getUsers(res: any, req: any) {
        res.writeStatus('200 OK').writeHeader('Content-Type', 'application/json').end(JSON.stringify(this.userService.getUsers())).close();
    }

    @Route('/', 'post')
    createUser(res: any, req: any) {
        // Логіка створення користувача
    }
}

startServer(1234);