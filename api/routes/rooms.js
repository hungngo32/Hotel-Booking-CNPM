import express from "express";
import {
    cancelRoom,
    createRoom,

    getRoom,
    getRooms,
    updateRoom,
    updateRoomAvailability,
    deleteRoomWithId
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
//Pull date availability
router.put("/cancelroom/:id", cancelRoom);
//
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
//router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//DELETE ROOM
router.delete("/:id", verifyAdmin, deleteRoomWithId);

//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;