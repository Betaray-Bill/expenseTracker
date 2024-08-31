import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// login - POST - /login
const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json(user);
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}



// Register - POST - /register
const register = async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password
    });
    await user.save()
    console.log(user)
    if (user) {
        generateToken(res, user._id);

        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}

// SignOut - GET - /signout
const signOut = async(req, res) => {
    res.clearCookie('jwt').status(200).json('SignOut success!');
}

export {
    login,
    register,
    signOut,
}