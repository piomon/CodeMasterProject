import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import projectsRouter from "./projects";
import leadsRouter from "./leads";
import aiRouter from "./ai";
import adminRouter from "./admin";
import userRouter from "./user";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(projectsRouter);
router.use(leadsRouter);
router.use(aiRouter);
router.use(adminRouter);
router.use(userRouter);

export default router;
