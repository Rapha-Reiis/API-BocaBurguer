import { Router } from "express";
import { v4 } from "uuid"; // nova dependencia 

import User from "./app/model/User.js";  // Model de usuarios




const routes = new Router



routes.get('/', async(request,response) =>{
    const user = await User.create({
        id: v4(),
        name: "Rapha",
        email: "raphael@gmail.com",
        password_hash: "kfldsjflkasj",

    })

    return response.status(200).json(user)
})






export default routes