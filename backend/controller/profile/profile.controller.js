import profileModel from "../../model/profile/profile.model.js";
import {
  badRequestResponse,
  createdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from "../../utils/sendResponse/response.handler.js";

// @desc: create profile for the user
// @route: POST /api/v1/profile/create-profile
// @access: private

// not accept the image here only create a profile for the user text field
export const createProfileController = async (req, res) => {
  try {
    const user = req.user;

    const { username, gender, bio, dob } = req.body;

    const newProfile = new profileModel({
      username,
      gender,
      bio: bio ?? null,
      dob: dob ? new Date(dob) : null,
      userId: user?._id,
    });

    const savedProfile = await newProfile.save();

    if (!savedProfile) {
      return badRequestResponse(res, "Failed to create profile");
    }

    return createdResponse(res, "Profile Created Successfully", newProfile);
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// @desc: get logged in user profile
// @route: GET /api/v1/profile/my-profile
// @access: private

export const getMyProfileController = async (req, res) => {
  try {
    const user = req.user;

    const profile = await profileModel
      .findOne({ userId: user?._id })
      .populate(
        "userId",
        "_id name email role isVerified accountBlock isDeleted",
      );

    if (!profile) {
      return notFoundResponse(res, "Profile not found");
    }

    return successResponse(res, "My Profile", profile);
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// @desc: update profile for the user
// @route: PUT /api/v1/profile/update-profile/:id
// @access: private

// not accept the image here only update the text field
export const updateProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const { username, gender, bio, dob } = req.body;

    const profileExist = await profileModel.findById(id);

    if (!profileExist) {
      return notFoundResponse(res, "Profile not found");
    }

    if (profileExist.userId.toString() !== user?._id.toString()) {
      return unauthorizedResponse(res, "Unauthorized user");
    }

    const profileUpdate = {
      username: username ?? profileExist.username,
      gender: gender ?? profileExist.gender,
      bio: bio ?? profileExist.bio,
      dob: dob ? new Date(dob) : profileExist.dob,
    };

    const updateProfile = await profileModel.findByIdAndUpdate(
      id,
      profileUpdate,
      { new: true },
    );

    if (!updateProfile) {
      return badRequestResponse(res, "Failed to update profile");
    }

    return successResponse(res, "Profile Updated Successfully", updateProfile);
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// export const addOrUpdateProfilePictureController = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// }

// export const deleteProfilePictureController = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// }
