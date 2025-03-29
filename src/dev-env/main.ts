import {Controller, GET, POST, startServer} from "../common";

@Controller("/123")
class Dev{
    @GET('/test')
    getTest() {
        return [{ id: 1 }, { id: 2 }, { id: 3 }];
    }

    @POST('/create', 'multipart/form-data')
    createUser(body: any) {
        return { message: "User created", user: body };
    }
}

//


startServer(8089);