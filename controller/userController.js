const User = require("../models/user");
const validator = require("validator");
const bcrypt  = require("bcrypt");

const userController = {
   userRegister:async(req,res)=>{
       try{
        console.log(req.body);
        const {firstname,lastname, email, password, phoneN,address} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }

        passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:passwordHash,
            phoneN:phoneN,
            address:address
        })
        await newUser.save();
        return res.status(201).json({
            messsage:"user Register Successfully",
            data:newUser
        });
       }catch(err){
           return res.status(500).json({err:err.message});
       }
   },
// login
   login:async(req,res)=>{
     try{
      console.log(req.body);
      const {email, password} = req.body;
      const validate = validator.isEmail(email);
      if(!validate){
          return res.status(400).json({message:"email format is not valid"
        });
      }
      const user = await User.findOne({email});
      if(!user){
          return res.status(400).json({message:"User is not exists"});
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
          return res.status(400).json({message:"password does not matched"});
      }
      return res.status(200).json({
          message:"user successfully login"
      });
      }catch(err){
        return res.status(500).json({err:err.message}); 
     }
   },

   // get All user
   getUser:async(req,res)=>{
      try{
         const user = await User.find();
         console.log(user);
         return res.status(200).json({
             message:"Success",
             data:user
         });
      }catch(err){
        return res.status(500).json({err:err.message}); 
      }
   },

   // user by id
   getUserById:async(req,res)=>{
       try{
          const _id = req.params.id;
          const getUser = await User.findById(_id);
          return res.status(200).json({
              message:" success",
              data:getUser
          })
       }catch(err){
        return res.status(500).json({err:err.message}); 
       }
   },

   // Delete User by Id
   deleteUserId:async(req,res)=>{
    try{
       const _id = req.params.id;
       const getUser = await User.findByIdAndDelete(_id);
       return res.status(200).json({
           message:" deleted Successfully",
           data:getUser
       })
    }catch(err){
     return res.status(500).json({err:err.message}); 
    }
},
//// update user by id
updateUserById:async(req,res)=>{
    try{
       const _id = req.params.id;
       const updateUser = await User.findByIdAndUpdate(_id);
       return res.status(200).json({
           message:" Updated Successfully",
           data:updateUser
       })
    }catch(err){
     return res.status(500).json({err:err.message}); 
    }
},

}

module.exports = userController;