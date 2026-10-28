import cloudinary from "../../config/cloudinary/cloudinary.config.js";
import profileModel from "../../model/profile/profile.model.js";
import {
  badRequestResponse,
  createdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from "../../utils/sendResponse/response.handler.js";

// @desc: create profile for the user
// @route: POST /api/v1/profile/create-profile
// @access: private

// not accept the image here only create a profile for the user text field
export const createProfileController = async (req, res) => {
  try {
    const user = req.user;

    const { username, gender, bio, dob } = req.body;

    const profileExist = await profileModel.findOne({ userId: user?._id });

    if (profileExist) {
      // update the profile
      const updateProfile = {
        username: username || profileExist.username,
        gender: gender || profileExist.gender,
        bio: bio || profileExist.bio,
        dob: dob ? new Date(dob) : profileExist.dob,
      };

      const updatedProfile = await profileModel.findByIdAndUpdate(
        profileExist._id,
        updateProfile,
        { new: true },
      );

      return successResponse(
        res,
        "Profile Updated Successfully",
        updatedProfile,
      );
    }

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
// @route: PUT /api/v1/profile/update-profile
// @access: private

// not accept the image here only update the text field
export const updateProfileController = async (req, res) => {
  try {
    const user = req.user;

    const { username, gender, bio, dob } = req.body;

    const profileExist = await profileModel.findOne({ userId: user?._id });

    if (!profileExist) {
      return notFoundResponse(res, "Profile not found");
    }

    const profileUpdate = {
      username: username || profileExist.username,
      gender: gender || profileExist.gender,
      bio: bio || profileExist.bio,
      dob: dob ? new Date(dob) : profileExist.dob,
    };

    const updateProfile = await profileModel.findByIdAndUpdate(
      profileExist?._id,
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

// @desc: add or update profile picture for the user
// @route: PUT /api/v1/profile/add-update-profile
// @access: private

export const addOrUpdateProfilePictureController = async (req, res) => {
  try {
    const image = req.file;
    const user = req.user;

    if (!image) {
      return badRequestResponse(res, "profile image not exist");
    }

    const profileExist = await profileModel.findOne({ userId: user?._id });

    // if profile exist than update the profile picture
    if (profileExist) {
      // if profile already have the profile picture than delete the old profile picture
      if (profileExist.profilePictureId) {
        const oldImage = profileExist.profilePictureUrl;
        const oldId = profileExist.profilePictureId;

        const deleteImage = await cloudinary.uploader.destroy(
          profileExist.profilePictureId,
        );

        if (deleteImage?.result !== "ok") {
          // delete the current upload image from cloudinary
          await cloudinary.uploader.destroy(image?.public_id);
          // save the old image and id again
          profileExist.profilePictureUrl = oldImage;
          profileExist.profilePictureId = oldId;

          await profileExist.save();

          return badRequestResponse(res, "profile picture not updated");
        }
        // update the profile pic and save
        profileExist.profilePictureUrl = image?.path;
        profileExist.profilePictureId = image?.filename;

        const updatedProfile = await profileExist.save();

        if (!updatedProfile) {
          await cloudinary.uploader.destroy(image?.filename);
          return badRequestResponse(res, "profile picture not updated");
        }
        return successResponse(
          res,
          "profile picture updated successfully",
          updatedProfile,
        );
      }

      // if profile url or id is not exist in database than simply save it in db
      profileExist.profilePictureId = image?.filename;
      profileExist.profilePictureUrl = image?.path;

      const updatedProfile = await profileExist.save();

      if (!updatedProfile) {
        await cloudinary.uploader.destroy(image?.filename);
        return badRequestResponse(res, "profile picture not updated");
      }
      return successResponse(
        res,
        "profile picture updated successfully",
        updatedProfile,
      );
    }

    // if profile not exist than create the profile picture
    const newProfile = new profileModel({
      userId: user?._id,
      profilePictureUrl: image?.path,
      profilePictureId: image?.filename,
    });

    const savedProfile = await newProfile.save();

    if (!savedProfile) {
      await cloudinary.uploader.destroy(image?.filename);
      return badRequestResponse(res, "profile picture not created");
    }

    return successResponse(
      res,
      "profile picture created successfully",
      savedProfile,
    );
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// @desc: delete profile picture for the user
// @route: DELETE /api/v1/profile/delete-profile
// @access: private

export const deleteProfilePictureController = async (req, res) => {
  try {
    const user = req.user;

    const profileExist = await profileModel.findOne({ userId: user?._id });

    if (!profileExist) {
      return notFoundResponse(res, "Profile not exist");
    }

    if (!profileExist?.profilePictureId) {
      return notFoundResponse(res, "Profile picture not exist");
    }

    const deleteImage = await cloudinary.uploader.destroy(
      profileExist?.profilePictureId,
    );

    if (deleteImage?.result !== "ok") {
      return badRequestResponse(res, "please try again!");
    }

    profileExist.profilePictureUrl = null;
    profileExist.profilePictureId = null;

    const updatedProfile = await profileExist.save();

    if (!updatedProfile) {
      return badRequestResponse(res, "please try again");
    }
    return successResponse(
      res,
      "Profile picture deleted successfully",
      updatedProfile,
    );
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};
