import * as Yup from 'yup'
import Product from '../model/Product.js'

class ProductController{

    async store(request, response){
    
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
        })

        try {
            schema.validateSync(request.body, {abortEarly:false}) 
        } catch (err) {
            return response.status(400).json({error: err.errors}) 
        }
        
        const {filename: path} = request.file
        const {name, price, category} = request.body
        
        const productCreate = await Product.create({
            name, 
            price,
            category,
            path
        })

        return response.status(201).json(productCreate)

    }

    async index(request,response){
        const findProducts = await Product.findAll()

        console.log({userId: request.userId})

        return response.json(findProducts)
    }


}


export default new ProductController()