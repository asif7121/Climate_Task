import { Router } from "express";
import climateRouter from './components/climateAPI/climate.route.js'


const router = Router()


router.use( '/climate', climateRouter )


export default router;