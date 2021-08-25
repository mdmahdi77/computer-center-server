const User = require('../models/user')
const sendToken = require('../utilis/jwtToken')

// register a user
exports.registerUser = async(req, res) => {

    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password
    })

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })

    sendToken(user, 200, res)

}

// login user
exports.loginUser = async(req, res) => {

    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({
            error: 'Please enter email or password'
        })
    }

    // find user in database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return res.status(400).json({
            error: 'Invalid email or password'
        })
    }

    // check if user password is correct or not
    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return res.status(400).json({
            error: 'Invalid email or password'
        })
    }

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })

    sendToken(user, 200, res)

}

// logout user
exports.logoutUser = async(req, res) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout successfully'
    })

}