
import pkg from 'mongoose';
const { Schema ,model } = pkg;

const UserSchema = Schema({

    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    mail:{
        type: String,
        required: [true, 'El Correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required: [true,'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type:String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON =function(){
 const {__v,password,...user }  = this.toObject();
 return user;
}

export const User= model('User',UserSchema)
