import z from "zod";
import { getFlowerLikeService, createFlowerLikeService,getFlowerLikeByCustomerIdService, deleteFlowerLikeService } from "../service/flowerLikeService.js";

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

export const getFlowerLikeByCustomerId = async (req, res) => {
    try{
        const {id} = req.params;
        const flowerLikes = await getFlowerLikeByCustomerIdService(id);
        if (flowerLikes.length === 0) {
            return res.status(404).json({ message: "Flower likes not found" });
        }
        res.status(200).json({message: "Flower likes found", flowerLikes});
    }catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors });
        }
        else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
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
        const {customer_id,flower_id}= req.body;
        const deletedFlowerLike = await deleteFlowerLikeService(customer_id,flower_id);
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
