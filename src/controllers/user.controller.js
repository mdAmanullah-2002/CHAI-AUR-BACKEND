import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "chai aur code ki ma ki taang ",
  });
});

export { registerUser };
