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

        const { filename: path } = request.file
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
            name,
            path
        })

        return response.status(200).json({id, name})
    }


    async index(request, response){
        const categories = await Category.findAll()

        return response.json(categories)
    }

    async update(request, response){
        const schema = Yup.object({
            name: Yup.string()
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

        const { id } = request.params

        const categotyExist = await Category.findByPk(id)
        if (!categotyExist){
            return response.status(400).json({error: "Categoria não existe"})
        }

        let path
        if(request.file){
            path = request.file
        }
        const { name } = request.body

        if(name){
            const nameCategoryExist = await Category.findOne({
                where:{
                    name,
                }
            })
            if (nameCategoryExist  && nameCategoryExist.id != id){
                return response.status(400).json({erro: "Categoria já existe"})
            }
        }

        await Category.update({
            name,
            path
        },
        {
            where: {
                id
            }
        }
        )


        console.log(request.body)
        return response.status(200).json({message: "Update feito com sucesso"})

    }
}


export default new CategoryController()