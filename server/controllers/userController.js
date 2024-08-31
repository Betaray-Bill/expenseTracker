import Income from "../models/incomeExpense.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// login - POST - /login
const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            token: generateToken(res, user._id),
            Income: user.income,
            Expense: user.expense,
            totalIncome: user.totalIncome,
            totalExpense: user.totalExpense,
        });
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

// SignOut - GET - /sign out
const signOut = async(req, res) => {
    res.clearCookie('jwt').status(200).json('SignOut success!');
}

// Get User
const getUser = async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
}

export {
    login,
    register,
    signOut,
    getUser
}