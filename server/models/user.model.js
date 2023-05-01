const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

// all the validation and hashing the password will be done at Schema level, so we'll not have to worry about them in controller file.
const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        minLength: [3, "First name must be at least 3 character"],
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"],
        minLength: [3, "Last name must be at least 3 character"],
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[5,"Password must be 5 characters or longer"]
    }
    
},{timestamps:true})

// in mongoose a virtual is a property that is not stored in MongoDB - it creates a virtual field
UserSchema.virtual('confirmPassword').get(()=>this._confirmPassword).set((value)=>(this._confirmPassword=value))

// pre middleware functions are executed one after another, when each middleware calls next 
UserSchema.pre('validate',function (next) {
    if(this.password!==this.confirmPassword){
        this.invalidate('confirmPassword','Password must match confirm password')
    }
    next()
});

// when we send a user model to the database, we want to take the password and encrypt it 
// it is recommended to use bcrypt in an asyncronous way so we will be using it with promises
UserSchema.pre('save', async function(next){
    try{
    // 10 => salting = re-encrypt it 10 times
    const hashedPassword = await bcrypt.hash(this.password,10)
      this.password=hashedPassword;
      next()  
    }
    catch{
        console.log('Error in save password',error)
    }
})
module.exports = mongoose.model("User", UserSchema);
