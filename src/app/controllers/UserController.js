import { v4 } from "uuid";

import User from "../model/User.js";
import * as yup from 'yup'

class UserController{

    async store(request,response){

        const schema = yup.object({
            name: yup.string().required(),
            email:yup.string().email().required(),
            password_hash: yup.string().min(6).required(),
            admin: yup.boolean()
        })

        try {
            schema.validateSync(request.body, {abortEarly:false}) // para ele não parar quando encontrar o primeiro erro, assim mostrat tudo que esta vindo errado
        } catch (err) {
            return response.status(400).json({error: err.errors}) // retorna err. padrão e errors que vem do yup mostrando oq esta errado
        }

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

    Sucesso:
    200 – requisição realizada com sucesso
    201 – Criado – Requisição de criação realizada com sucesso.

    Erro do cliente(Front-End)
        400 – Bad request
        401 – Unautherized
        403 – Forbidden (Proibido)
        404 – NotFound (Não foi encontrado)

    Erro:
        500 – Internal server Error
        502 – Bad Gateway



*/
