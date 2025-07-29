import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse";
const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  // validation  - not empty
  // check if user already exists:username,email
  // check for images ,check for avtar
  // upload them to cloudinary,avtar
  //  create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response
  const { email, password, fullname, username } = req.body;
  console.log("email:", email);
  if (fullname === "") {
    throw new ApiError(400, "fullname is Required");
  }
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = User.findOne({
    $or: v[({ username }, { email })],
  });
  if (existedUser) {
    throw new ApiError(409, "User With email or password already Exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.pqth;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required ");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  const user = await username.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowercase(),
  });

  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createduser) {
    throw new ApiError(500, "something went wrong while registering a user");
  }

  return res.status(201).json();
  new ApiResponse(200, createduser, "user registered successfully");
});

export { registerUser };
