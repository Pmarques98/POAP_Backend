import { Router, Request, Response } from "express";
import {CreateUserController} from './controllers/user/CreateUserController'
import {CreateUserControllerPsychologist} from './controllers/psychologist/CreateUserControllerPsychologist'
import {AuthUserController} from './controllers/user/AuthUserController'
import {CreateConsultationController} from './controllers/consultation/CreateConsultationController'
import { CreateChildController } from "./controllers/children/CreateChildController";
import { DashboardUserController } from "./controllers/dashboards/DashboardUserController";
import { DashboardPsychologistController } from "./controllers/dashboards/DashboardPsychologistController";
import { AcceptConsultationController } from "./controllers/consultation/AcceptConsultationController";
import { UpdateMeetsLinkController } from './controllers/consultation/UpdateMeetsLinkController';
import { CreateReportController } from "./controllers/recomendations/CreateReportController";
import { CreateConsultationAceptedController } from "./controllers/consultation/CreateConsultationAceptedController";
import { GetReportsController } from "./controllers/recomendations/GetReportsController";

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ ok : true})
})

//rotas das funcionalidades da plataforma online
router.post('/cadastro/usuario', new CreateUserController().handle)
router.post('/cadastro/psicologo', new CreateUserControllerPsychologist().handle)
router.post('/login', new AuthUserController().handle)
router.post('/consulta', new CreateConsultationController().handle)
router.post('/cadastro/crianca', new CreateChildController().handle)
router.post('/dashboard/usuario', new DashboardUserController().handle)
router.post('/dashboard/psicologo', new DashboardPsychologistController().handle)
router.post('/consulta/aceitar', new AcceptConsultationController().handle);
router.post('/consulta/alterarMeets', new UpdateMeetsLinkController().handle);
router.post('/reports', new CreateReportController().handle);
router.post('/consulta/aceitas', new CreateConsultationAceptedController().handle);
router.post('/reports/aceitos', new GetReportsController().handle);



export {router};