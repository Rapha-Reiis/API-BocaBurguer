import { v4 } from "uuid";

import User from "../model/User.js";

class UserController{

    async store(request,response){

        console.log(request.body)
        const {name,email,password_hash,admin} = request.body

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin
        })


        

        return response.status(201).json({
            id: user.id,
            name,
            email,
        })
    }    

    async index(){

    }


}

export default new UserController()


/*
    Store = cadastrar 
    index => Listar Varios
    show => listar apenas 1
    update => atualizar
    delete => deletar
*/