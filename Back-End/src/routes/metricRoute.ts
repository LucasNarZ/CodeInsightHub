import { Router } from "express";
import { Registry, Gauge, collectDefaultMetrics } from "prom-client";

const router = Router();

const register = new Registry();


collectDefaultMetrics();

router.get("/", async (req:ExpressRequest, res:ExpressResponse) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
})

export default router;