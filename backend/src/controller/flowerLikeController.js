import z from "zod";
import { getFlowerLikeService, createFlowerLikeService, deleteFlowerLikeService } from "../service/flowerLikeService.js";

const flowerLikeSchema = z.object(
    {
        customer_id: z.string().uuid(),
        flower_id: z.string().uuid()
    }
)

export const getFlowerLike = async (req, res) => {
    try {
        const flowerLike = await getFlowerLikeService();
        res.status(200).json(flowerLike);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const createFlowerLike = async (req, res) => {
    try {
        const flowerLike = flowerLikeSchema.parse(req.body);
        const newFlowerLike = await createFlowerLikeService(flowerLike);
        res.status(200).json(newFlowerLike);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors });
        }
        else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const deleteFlowerLike = async (req, res) => {
    try {
        const validateData = flowerLikeSchema.parse(req.params);
        const deletedFlowerLike = await deleteFlowerLikeService(validateData);
        res.status(200).json(deletedFlowerLike);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors });
        }
        else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
