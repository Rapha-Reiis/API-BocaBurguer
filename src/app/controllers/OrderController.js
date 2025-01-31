import * as Yup from 'yup'
import Products from '../model/Product.js'
import Category from '../model/Category.js'
import Order from '../schemas/Order.js'
import userController from './UserController.js'
import UserController from './UserController.js'
import User from '../model/User.js'
class OrderController{
    async store(request, response){
        const schema = Yup.object({
            products: Yup.array()
            .required()
            .of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required()
                })
            )
        })

        try {
            schema.validateSync(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.errors})
        }

        const { products } = request.body

        const ProductsIds = products.map((product) => product.id)

        const findProducts = await Products.findAll({
            where:{
                id: ProductsIds
            },
            include:{
                model: Category,
                as: 'category',
                attributes: ["name"]
            }
        })

        const formatterdProducts = findProducts.map((findProduct2) =>{

            const productIndex = products.findIndex((item) => item.id === findProduct2.id)
            
            const newProduct = {
                id:findProduct2.id,
                name:findProduct2.name,
                price: findProduct2.price,
                category: findProduct2.category.name,
                url: findProduct2.url,
                quantity: products[productIndex].quantity
            }

            return  newProduct
        })

        const {name: userName} = await User.findByPk(request.userId)

        const newOrder ={
            user:{
                id: request.userId,
                name: userName
            },
            products: formatterdProducts,
            status: "Pedido realizado"
        }


        const CreateOrder = await Order.create(newOrder)

        return response.status(201).json(CreateOrder)
    }

    async index(request, response){
        const Orders = await Order.find()
        return response.status(201).json({Orders})
    }

    async update(request,response){
        const schema = Yup.object({
            status: Yup.string().required()
        })

        try {
            schema.validateSync(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.errors})
        }    
        
        const { id } = request.params
        const  { status } = request.body

        await Order.updateOne({_id: id}, {status})


        return response.json({message: "Status foi atualizado"})
    }
}


export default new OrderController()