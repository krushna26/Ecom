const express=require('express');
const router=express();

router.use(express.json());

const userController=require('../controller/userController');
const {registerValidators}=require('../helpers/validations');
// const path=require('path');
// const multer=require('multer');

// const storage=multer.diskStorage({
//     destination:function(req,file,cd){

//         if (file.mimetype==='image/png' || file.mimetype==='image/jpg'){
//             cd(null,path.join(__dirname,'../public/images'))
//         }
        
//     },
//     filename:function(req,file,cd){

//         const name=Date.now()+'-'+file.origionalname;
//         cd(null,name)
//     }
// });

// const fileFilter=(req,file,cb)=>{
//     if (file.mimetype==="image/png" || file.mimetype==="image/jpg"){
//     cb(null,true);
//     } 
//     else{
//         cb(null,false);
//     }

// }


// const upload=multer({storage:storage,
//     fileFilter:fileFilter
// })


// router.post('/register',upload.single('image'),registerValidators,userController.userRegister)
router.post('/register',registerValidators,userController.userRegister)
module.exports=router;