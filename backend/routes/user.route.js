import express from 'express'
import {login, register,updateProfile} from "../controllers/user.contoller.js"
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, updateProfile);
export default router;