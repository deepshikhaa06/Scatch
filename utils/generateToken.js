const jwt = require('jsonwebtoken')

//* Function to generate JWT token for a given user.
const generateToken = (user)=>{
    const token = jwt.sign({id: user._id,email:user.email}, process.env.JWT_KEY);
    return token;
}
module.exports = generateToken;