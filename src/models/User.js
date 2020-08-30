const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name:{
        type: String,
        require: [true, "'The name is required"]
    },

    email:{
        type: String,
        require: [true, "'The email is required"]
    },

    password: {
        type: String,
        require: [true, "'The password is required"],
    }
}, {
    timestamps:true
});

UserSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", UserSchema);