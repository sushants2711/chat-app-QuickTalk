// import userModel from "../../model/user.model.js";
// import { badRequestResponse, internalServerErrorResponse, successResponse } from "../../utils/response.handler.js";


// // @desc: Register a new user
// // @route: POST /api/v1/user/signup
// // @access: Public

// export const signupController = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const userExist = await userModel.findOne({ email });

//         // if user exist and it is verified then return
//         if (userExist) {
//             if (userExist.isVerified) {
//                 return badRequestResponse(res, "User Already Exists");
//             }
//             if (userExist.accountBlock) {
//                 return badRequestResponse(res, "Your Account Has Been Blocked");
//             }
//             // if user exist and it is deleted then un-delete it and login
//             if (userExist.isDeleted) {
//                 userExist.isDeleted = false;
//                 userExist.lastLogin = Date.now();
//                 await userExist.save();

//                 const dataSendToClient = userExist.toObject();
//                 delete dataSendToClient.password;
//                 return successResponse(res, "Account Restore Successfully", dataSendToClient);
//             }
//         }

//         // if user exist and account is not verified than send a otp again and also check the limit of the otp is max 5


//         // if the user is totally fresh than send a fresh email and everything


//     } catch (error) {
//         return internalServerErrorResponse(res, "Internal Server Error", error?.message);
//     };
// };

// // @desc: Login a user
// // @route: POST /api/v1/user/login
// // @access: Public



// // @desc: verify a user
// // @route: POST /api/v1/user/verify-user
// // @access: Public


// // @desc: Logout a user
// // @route: POST /api/v1/user/logout
// // @access: Private


// // @desc: Get current user
// // @route: GET /api/v1/user/current-user
// // @access: Private


// // @desc: forgot user password
// // @route: POST /api/v1/user/forgot-password
// // @access: Public


// // @desc: reset user password
// // @route: PUT /api/v1/user/reset-password
// // @access: Private