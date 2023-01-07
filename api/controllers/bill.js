
import Bill from "../models/Bill.js";
import { createError } from "../utils/error.js";
export const createBill = async (req, res, next) => {
    const newBill = new Bill(req.body);
    //res.status(200).json(newBill)

    try {
        const savedBill = await newBill.save()
        res.status(200).json(savedBill)

    } catch (err) {
        next(createError(err));
    }
}

export const deleteBill = async (req, res, next) => {
    try {
        await Bill.findByIdAndDelete(req.params.id);
        res.status(200).json("Bill has been deleted")

    } catch (err) {
        next(createError(err));
    }
}
export const getBill = async (req, res, next) => {
    const userID = req.params.UserID;

    try {
        if (req.params.UserID != "") {
            const bills = await Bill.find({
                UserID: userID
            }).limit(req.query.limit);
            res.status(200).json(bills);
        }
        else {
            const bills = await Bill.find({
            })
            res.status(200).json(bills);
        }
    } catch (err) {
        next(err);
    }


};
export const getAllBill = async (req, res, next) => {

    try {
        const bills = await Bill.find()
        res.status(200).json(bills);
    } catch (err) {
        next(err);
    }
};

export const countBill = async (req, res, next) => {
    //const cities = req.query.cities.split(",");
    try {
        const num = await Bill.count()
        res.status(200).json(num);
    } catch (err) {
        next(err);
    }
};

export const earningMoney = async (req, res, next) => {
    //const cities = req.query.cities.split(",");

    try {

        const tong = await Bill.aggregate([{ $group: { _id: null, sum_val: { $sum: "$Total" } } }])

        res.status(200).json(tong[0].sum_val);
    } catch (err) {
        next(err);
    }
};