import jwt, { decode } from 'jsonwebtoken'
import authConfig from '../../config/auth.js'


function authMiddleware(request, response, next){


    const authToken = request.headers.authorization 

    if(!authToken){
        return response.status(401).json({error: "Token não existe"})
    }

    const token = authToken.split(' ').at(1)
    try {
        jwt.verify(token, authConfig.secret, (err, decoded) =>{
            if(err){
                throw new Error()
            }
            request.userId = decoded.id            
            return next()
        })
    } catch (err) {
        return response.status(401).json({error: "Token é invalido"})
    }
}



export default authMiddleware