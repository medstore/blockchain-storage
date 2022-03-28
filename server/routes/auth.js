const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const {signin, signup ,storeFiles} = require('../controllers/auth')
const {Web3Storage} = require("web3.storage");
const  sharp = require('sharp')
// import { Web3Storage } from 'web3.storage'
const getFilesFromPath = require("web3.storage");

//user Auth
router.route("/signup").post(signup);
router.route("/signin").post(signin);
// router.route("/upload").post(storeFiles);
// router.route("/upload").post(upload.single('file'), storeFiles);


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

router.post("/upload",multer().single('file'), async function (req, res, next) {
    try {
        console.log(req.file)
        const client = makeStorageClient()
        sharp(req.file.buffer)
            .resize({ width: 75,height: 75 })
            .toBuffer()
            .then(data => {
                // const upload = async(newdata)=>{
                //     const cid = await client.put(newdata)
                //     console.log('stored files with cid:', cid)
                // }
                // upload(data)
                const cid =  client.put(data)
            
            // res.send("File uploaded");
            }).catch(err =>{
            console.log("err: ",err);    
            });
        
    } catch (err) {
        console.log(err)
    } 
  });

module.exports = router;