import * as Yup from 'yup'
import Category from '../model/Category.js'
import User from '../model/User.js'


class CategoryController {


    async store(request, response){
        const schema = Yup.object({
            name: Yup.string().required()
        })

        try {
            schema.validateSync(request.body,{abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.errors})
        }

        const {admin: isAdmin} = await User.findByPk(request.userId)
        if(!isAdmin){
            return response.status(401).json({message: "Usuario não é admin"})
        }

        // const { filename: path } = request.file
        const {name} = request.body

        const categotyExist = await Category.findOne({
            where:{
                name
            }
        })
        if(categotyExist){
            return response.status(400).json({error: "Categoria já existe"})
        }

        const { id } = await Category.create({
            name
        })

        return response.status(200).json(id, name)
    }


    async index(request, response){
        const categories = await Category.findAll()

        return response.json(categories)
    }
}


export default new CategoryController()