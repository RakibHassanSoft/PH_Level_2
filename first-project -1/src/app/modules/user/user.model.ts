import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<TUser>({
    id:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    needsPasswordChange:{
        type:Boolean,
        default: true
    },
    role:{
        type:String,
        enum: ['admin', 'faculty', 'student'],
    },
    status:{
        type:String,
        enum: ['in-progress' ,'blocked'],
        default:'in-progress'
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


//presave middlewere
userSchema.pre('save', async function (next) {
    // console.log(this,'pre hook : we will save the data')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; //document
    //hashing password and save into db
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
  
    next();
  });
  
  //post save middlewere
  userSchema.post('save', function (doc, next) {
    doc.password = '';
  
    console.log('post hook : we saved the data');
  
    next();
  });
export const User = model<TUser>('user',userSchema)