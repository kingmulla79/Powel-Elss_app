const UserDetails = require("../models/UserDetails");
const path = require("path");

const HomePage_Load_Page = (req, res) => {
  res.status(200).json({ success: true });
};
const Homepage_Upload_Profile_Pic = async (req, res) => {
  const user = req.user;

  if (!user)
    return res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  try {
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const profile_pic = fileUrl;
    console.log(profile_pic);
    // const profileBuffer = req.file.buffer;
    // const { width, height } = await sharp(profileBuffer).metadata();
    // const profile_pic = await sharp(profileBuffer)
    //   .resize(Math.round(width * 0.5), Math.round(height * 0.5))
    //   .toBuffer();

    await UserDetails.findByIdAndUpdate(user._id, { profile_pic });
    res.status(201).json({
      success: true,
      message: "Your profile has been updated",
    });
  } catch (error) {
    console.log("Error while uploading the message", error);
    res.status(500).json({
      success: false,
      message:
        "Server Error: error while uploading the message. Try again after some time",
      error: error,
    });
  }
};

module.exports = {
  HomePage_Load_Page,
  Homepage_Upload_Profile_Pic,
};
