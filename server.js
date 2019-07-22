
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
/* GET home page. */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'POST');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
 res.setHeader('Access-Control-Allow-Credentials', true);


  next();
});



app.get('/api', function (req, res) {
  res.end('file catcher example');
});

 
app.post('/api/upload',upload.single('photo'), function (req, res) {
  debugger
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({originalname:req.file.originalname, uploadname:req.file.filename,success: true});      
        
      }
});
router.post('/api/upload', function(req,res,next){
  debugger
  filepath = path.join(__dirname,'./uploads') +'/'+ req.body.filename;
  res.sendFile(filepath); 
});
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});

// // server.js

// const path = require('path');
// const fs = require('fs');
// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser')
// const app = express();
// const router = express.Router();

// const DIR = './uploads';
 
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
//     }
// });
// let upload = multer({storage: storage});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
 
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
 
// app.get('/api', function (req, res) {
//   res.end('file catcher example');
// });
 
// app.post('/api/upload',upload.single('photo'), function (req, res) {
//     if (!req.file) {
//         console.log("No file received");
//         return res.send({
//           success: false
//         });
    
//       } else {
//         console.log('file received');
//         return res.send({
//           success: true
//         })
//       }
// });
 
// const PORT = process.env.PORT || 3000;
 
// app.listen(PORT, function () {
//   console.log('Node.js server is running on port ' + PORT);
// });