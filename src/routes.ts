import { Router, Request, Response } from "express";
import {CreateUserController} from './controllers/user/CreateUserController'
import {CreateUserControllerPsychologist} from './controllers/psychologist/CreateUserControllerPsychologist'
import {AuthUserController} from './controllers/user/AuthUserController'
import {CreateConsultationController} from './controllers/consultation/CreateConsultationController'
import { CreateChildController } from "./controllers/children/CreateChildController";


const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ ok : true})
})

//rotas users
router.post('/cadastro/usuario', new CreateUserController().handle)
router.post('/cadastro/psicologo', new CreateUserControllerPsychologist().handle)
router.post('/login', new AuthUserController().handle)
router.post('/consulta', new CreateConsultationController().handle)
router.post('/cadastro/crianca', new CreateChildController().handle)



export {router};