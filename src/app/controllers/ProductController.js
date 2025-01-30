import * as Yup from 'yup'
import Product from '../model/Product.js'
import Category from '../model/Category.js'
import User from '../model/User.js'

class ProductController{

    async store(request, response){
    
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required()
        })

        try {
            schema.validateSync(request.body, {abortEarly:false}) 
        } catch (err) {
            return response.status(400).json({error: err.errors}) 
        }

        const {admin: isAdmin} = await User.findByPk(request.userId)
        if(!isAdmin){
            return response.status(401).json({message: "Usuario não é admin"})
        }
        
        const {filename: path} = request.file
        const {name, price, category_id} = request.body
        
        const productCreate = await Product.create({
            name, 
            price,
            category_id,
            path
        })

        return response.status(201).json(productCreate)

    }

    async index(request,response){
        const findProducts = await Product.findAll({
            include:[
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        })
        return response.json(findProducts)
    }


}


export default new ProductController()