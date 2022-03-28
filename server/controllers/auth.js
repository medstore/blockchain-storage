const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Files = require("../models/Files");

//  SignIn user
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };

  //   Register user
exports.signup = async (req, res, next) => {
    const { fullname, email, password, cpassword } = req.body;
  
    try {
      const oldUser = await User.findOne({ email: req.body.email });
      if (password != cpassword) {
        return res.status(401).json({ sucess: false, error: "Invalid credential" });
      }
      if (oldUser) {
        return res.status(409).json({ sucess: false, error: "user already exist" })
      }
      const user = await User.create({
        fullname,
        email,
        password,
      });
  
      sendToken(user, 200, res);
    }
    catch (err) {
      next(err);
    }
  };
  

  const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };


exports.storeFiles = async (req, res, next) => {
    try {
        console.log(req.body)
        const { cidValue , userUid , userName , userEmail , userImg } = req.body;
        const files = await Files.create({
          cidValue: cidValue ,
          userUid: userUid,
          userName: userName,
          userEmail: userEmail,
          userImg : userImg
      });
      res.status(200).json({ sucess: true, message: "File Added Successfully" });
    } catch (err) {
        next(err);
    }
};

exports.retriveData = async (req, res, next) => {
  try {
      console.log(req.body)
      const client = makeStorageClient()
      const res = await client.get(req.body.cid)
      console.log(`Got a response! [${res.status}] ${res.statusText}`)
      if (!res.ok) {
        // throw new Error(`failed to get ${req.body.cid}`)
        console.log("got error")
      }
  }
  catch (err) {
    next(err);
  }
};
