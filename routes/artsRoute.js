import express from 'express';
import { getArt } from '../controller/artsController.js';

const router = express.Router();

router.get("/",getArt);

export default router;