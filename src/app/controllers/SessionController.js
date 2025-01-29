import * as Yup from 'yup'
import User from '../model/User.js'
import jwt from 'jsonwebtoken'


class SessionControlle{

    async store(request, response){

        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        })

        const errorMsg = () => {
            response.status(401).json({erro: "Usuário ou senha estão incorretos"})
        }

        // aqui estamos validando os dados
        const validation = await schema.isValid(request.body)
        if(!validation){
            return response.status(401).json({error: "Formato dos dados esta errado"})
        }

        // quebrando o request
        const { email, password } = request.body
        // validando se usuario existe
        const userExist = await User.findOne({
            where:{
                email
            }
        })
        if(!userExist){
            return errorMsg()
        }
        // Validando senha
        const isSamePassword = await userExist.comparePassword(password)
        if(!isSamePassword){
            return errorMsg()
        }

        return response.status(201).json({
            id: userExist.id,
            name: userExist.name,
            email,
            admin: userExist.admin,
            token: jwt.sign({id: userExist.id}, 'f6a078e5438f1c56edb9e4c3b1006075', {
                expiresIn: '5d'
            })
        })

    }
}


export default new SessionControlle()