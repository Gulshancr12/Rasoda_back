import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    // Ensure req.file is available and has filename property
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    
    const image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Ensure that the file path is correct
        const imagePath = `uploads/${food.image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error removing file:", err);
                return res.status(500).json({ success: false, message: "Error removing file" });
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addFood, listFood, removeFood };
