import { Router, Request, Response } from "express";
import {CreateUserController} from './controllers/user/CreateUserController'


const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ ok : true})
})

//rotas users
router.post('/users', new CreateUserController().handle)

export {router};