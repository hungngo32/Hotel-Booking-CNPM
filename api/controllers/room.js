import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumber._id": req.params.id },
            {
                $push: {
                    "roomNumber.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};
export const cancelRoom = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumber._id": req.params.id },
            {
                $pull: {
                    "roomNumber.$.unavailableDates": {
                        $in: req.body.dates
                    }
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};
const deleteRoom = async (hotelid, roomid) => {
    const hotelId = hotelid;

    try {
        await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: roomid },
        });
    } catch (err) {
        next(err);
    }

};
export const deleteRoomWithId = async (req, res, next) => {
    try {

        const listHotel = await Hotel.find();

        // listHotel.map((item) => {
        //     // Hotel.findByIdAndUpdate(item._id, {
        //     //     $pull: { rooms: req.params.id },
        //     // });
        //     try{
        //     const required = {
        //         hotelId: item.id,
        //         id: req.params.id
        //     }
        //    await this.deleteRoom(required, res, next);
        // }catch(err)
        // {
        //     next(err);
        // }
        // })

        await Promise.all(listHotel.map((item) => {
            deleteRoom(item.id, req.params.id)
            return item
        }))
        await Room.findByIdAndDelete(req.params.id);
        // await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted.")
        //res.status(200).json("Room has been deleted.");

    } catch (err) {
        next(err);
    }
};
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};