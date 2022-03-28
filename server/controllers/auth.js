const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Web3Storage = require("web3.storage");
const getFilesFromPath = require("web3.storage");

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


// import { getFilesFromPath } from 'web3.storage'

// import { Web3Storage } from 'web3.storage'

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an 
  // environement variable or other configuration that's kept outside of 
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}


async function getFiles(path) {
  const files = await getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`)
  return files
}


// async function storeFiles(files) {
//     const client = makeStorageClient()
//     const cid = await client.put(files)
//     console.log('stored files with cid:', cid)
//     return cid
//   }


  //get user data
exports.storeFiles = async (req, res, next) => {
    try {
        // console.log(req.body.ourFile)
        // const client = makeStorageClient()
        // const cid = await client.put(files)
        // console.log('stored files with cid:', cid)
        res.status(200).json({"red" : "123"})
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
