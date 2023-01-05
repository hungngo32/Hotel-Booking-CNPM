import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
export const setEmpty = async (req, res, next) => {
    try {
        await User.updateOne(
            { "_id": req.params.id },

            {
                $set: { cart: [] }
            }
        );
        res.status(200).json("Cart status has been empty.");
    } catch (err) {
        next(err);
    }
};
export const updateCart = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id,

            {
                $push: { "cart": req.body.cart }
            }
        );
        res.status(200).json("Cart status has been updated.");
    } catch (err) {
        next(err);
    }
};

export const countUsers = async (req, res, next) => {
    //const cities = req.query.cities.split(",");
    try {
        const num = await User.count()
        res.status(200).json(num);
    } catch (err) {
        next(err);
    }
};