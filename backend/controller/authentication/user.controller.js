// import { TOKEN_NAME } from "../../config/constantData/constant.js";
// import userModel from "../../model/user.model.js";
// import { sendCookieToUser } from "../../utils/cookie/sendCookie/send.cookie.js";
// import { generateOTP } from "../../utils/otp/otp.generator.js";
// import { verifyPassword } from "../../utils/password/comparePassword/compare.password.js";
// import { hashPassword } from "../../utils/password/hashedPassword/hash.password.js";
// import { badRequestResponse, createdResponse, internalServerErrorResponse, successResponse } from "../../utils/sendResponse/response.handler.js";

// // @desc: Register a new user
// // @route: POST /api/v1/user/signup
// // @access: Public

// export const signupController = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const userExist = await userModel.findOne({ email });

//         // if user exist and it is verified then return
//         if (userExist) {

//             // if user exist and it is verified
//             if (userExist.isVerified) {
//                 return badRequestResponse(res, "User Already Exists");
//             }

//             // if user exist and it is blocked
//             if (userExist.accountBlock) {
//                 return badRequestResponse(res, "Your Account Has Been Blocked");
//             }

//             // if user exist and it is deleted
//             if (userExist.isDeleted) {
//                 return badRequestResponse(res, "Your Account Has Been Deleted, please restore it first");
//             }

//             // if user exist but it is not verified
//             if (!userExist.isVerified) {

//                 // if the name is different then update it
//                 if (userExist.name !== name) {
//                     userExist.name = name;
//                 };

//                 // now compare the password
//                 const isPasswordMatch = await verifyPassword(password, userExist.password);

//                 // if the password is different then update it
//                 if (!isPasswordMatch) {
//                     const hashThepassword = await hashPassword(password);
//                     userExist.password = hashThepassword;
//                 };

//                 const otp = generateOTP();

//                 const savedExistingUser = await userExist.save();

//                 // now send an OTP for the verification to the user and also in the redis for setting the expiry time of the OTP

//                 // now send a email to user

//                 const dataSendToClient = savedExistingUser.toObject();

//                 delete dataSendToClient.password;

//                 // now send a cookie to the user

//                 try {
//                     const token = await sendCookieToUser(dataSendToClient._id, res);

//                     dataSendToClient[TOKEN_NAME] = token;

//                 } catch (error) {
//                     return internalServerErrorResponse(res, "Failed to send cookie", error?.message);
//                 };

//                 // return a success message to the user
//                 return successResponse(res, "OTP sent to your email address successfully", dataSendToClient);

//             }

//         }

//         // if the user is totally fresh than send a fresh email and everything

//         const hashedThePassword = await hashPassword(password);

//         const otp = generateOTP();

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedThePassword
//         })

//         const savedNewUser = await newUser.save();

//         if (!savedNewUser) {
//             return badRequestResponse(res, "Error Occured While Signing Up");
//         }

//         // in redis send the otp with user id and set the expiry time of 5 minutes
//         // now store otp and user id and time

//         // now send an otp to the user email

//         const dataSendToClient = savedNewUser.toObject();

//         delete dataSendToClient.password;

//         // send a cookie to the user

//         try {
//             const token = await sendCookieToUser(dataSendToClient._id, res);

//             dataSendToClient[TOKEN_NAME] = token;
//         } catch (error) {
//             return internalServerErrorResponse(res, "Failed to send cookie", error?.message);
//         };

//         // return a success message to the user
//         return createdResponse(res, "OTP sent to your email address successfully", dataSendToClient);

//     } catch (error) {
//         return internalServerErrorResponse(res, "Internal Server Error", error?.message);
//     };
// };

// // @desc: Login a user
// // @route: POST /api/v1/user/login
// // @access: Public

// // @desc: verify user otp
// // @route: POST /api/v1/user/verify-otp
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
