import { AuthController } from "../../controllers/index";
import { Router } from "express";

const authRouter = Router();

/******************************************************************************
 *                     Sign-up - "POST /api/auth/sign-up"
 ******************************************************************************/
/**
 * @api {POST} /api/auth/sign-up sign-up
 * @apiName auth-sign-up-POST
 * @apiGroup auth
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {boolean} error for checking the error.
 * @apiSuccess {String} message for information.
 * @apiSuccess {object} data for payload.
 *
 * @apiExample Sample-Request:
 * {
 *  "name":"full name",
 *  "email": "email",
 *  "phone": "phone",
 *  "password":"password"
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "error": false,
 *       "message": "Sign-up successfully !!"
 *       "data": object
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 unauthorized request
 *     {
 *        "status": false
 *        "error": true,
 *        "message": "Something went wrong"
 *     }
 */
authRouter.post('/sign-up', AuthController.onSignUp);

authRouter.post('/login', AuthController.onLoginWithPhoneOtp);
authRouter.post('/verify-otp', AuthController.onVerifyOtp);
authRouter.post('/sign-in', AuthController.onSignIn);
authRouter.get('/video', AuthController.getVideo);

export default authRouter;