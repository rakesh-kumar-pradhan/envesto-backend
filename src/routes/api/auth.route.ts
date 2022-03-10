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
 *  "password":"password",
 *  "dob":"dob",
 *  "country":"country"
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
authRouter.post("/sign-up", AuthController.onSignUp);

/******************************************************************************
 *                     Sign-In - "POST /api/auth/sign-in"
 ******************************************************************************/
/**
 * @api {POST} /api/auth/sign-in sign-in
 * @apiName auth-sign-in-POST
 * @apiGroup auth
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {boolean} error for checking the error.
 * @apiSuccess {String} message for information.
 * @apiSuccess {object} data for payload.
 *
 * @apiExample Sample-Request:
 * {
 *  "email": "email",
 *  "password":"password"
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "error": false,
 *       "message": "Sign-in successfully !!"
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
authRouter.post("/sign-in", AuthController.onSignIn);

/******************************************************************************
 *                     Login With PhoneOtp - "POST /api/auth/login"
 ******************************************************************************/
/**
 * @api {POST} /api/auth/login login-with-phoneOtp
 * @apiName auth-login-with-phoneOtp-POST
 * @apiGroup auth
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {boolean} error for checking the error.
 * @apiSuccess {String} message for information.
 * @apiSuccess {object} data for payload.
 *
 * @apiExample Sample-Request:
 * {
 *  "phone": "phone",
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "error": false,
 *       "message": "sent otp successfully!!"
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
authRouter.post("/login", AuthController.onLoginWithPhoneOtp);

/******************************************************************************
 *                     Login With Phone-Verify-Otp - "POST /api/auth/verify-otp"
 ******************************************************************************/
/**
 * @api {POST} /api/auth/verify-otp login-with-phone-verify-otp
 * @apiName auth-login-with-phoneVerify-otp-POST
 * @apiGroup auth
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {boolean} error for checking the error.
 * @apiSuccess {String} message for information.
 * @apiSuccess {object} data for payload.
 *
 * @apiExample Sample-Request:
 * {
 *  "otp": "otp",
 * "token":"token"
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "error": false,
 *       "message": "You are successfully logged in !!"
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

authRouter.post("/verify-otp", AuthController.onVerifyOtp);
authRouter.get("/video", AuthController.getVideo);

export default authRouter;
