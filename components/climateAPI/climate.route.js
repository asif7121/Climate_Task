import { Router } from "express";
import controller from "./climate.controller.js";


const router = Router();

router.post( '/', controller.newClimateData )
router.get( '/allrecords', controller.getAllRecords )
router.get( '/arearecords', controller.areaRecords )
router.get( '/cli-area', controller.p_areaAndp_climate )
router.get( '/climate-change-index', controller.getClimateChangeIndex )





export default router;