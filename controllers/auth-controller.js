const User = require("../models/user-model");
const bcrypt = require("bcryptjs");




// HOME LOGIC


const home = async (req, res) => {
  try {
    res.status(200).send("welcome to registration page router");
  } catch (error) {
    console.log(error);
  }
};


//USER REGISTRATION LOGIC


const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // hash the password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    })

    res.status(201).json({
         msg: "registration successfull" ,
         token: await userCreated.generateToken(), 
        userId:  userCreated.id.toString(),
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

//USER LOGIN LOGIC

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist)

        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials -"});
        }
       
       // const user = await bcrypt.compare(password, userExist.password);
       const user = await userExist.comparePassword(password);

       if (user){
        res.status(200).json({
            msg: "Login successfull" ,  
            token: await userExist.generateToken(), 
           userId:  userExist.id.toString(),
       });

       }else{
        res.status(401).json({message:"Invalid email or password"});
       }

    } catch (error) {
       // res.status(500).json("internal server error");
       next(error);
    }
}


// to send user data  user logic

const user =async (req, res) => {
  try {
   const userData = req.user;
    console.log(userData);
  return  res.status(200).json({userData});
    
  } catch (error) {
    console.log(`error from the user route $ {error}`);
  }
}



module.exports = { home, register, login ,user};
