import * as Yup from 'yup'
import User from '../model/User.js'


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

        return response.status(201).json({message: "session"})

    }
}


export default new SessionControlle()