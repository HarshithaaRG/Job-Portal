import express from 'express'
import {login, register,updateProfile,logout, analyse_resume} from "../controllers/user.contoller.js"
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { singleUpload, upload } from '../middlewares/multer.js';
const router=express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile);
router.route("/logout").get(logout);
router.route("/analyse").post(upload,analyse_resume);
export default router;