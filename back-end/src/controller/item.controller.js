const Item = require("../models/item.model");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({ _id: id });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    console.log(req.body.img);

    const item = new Item({
      ...req.body,
      img: req.body.img ? req.body.img : null, 
    });

    const savedItem = await item.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    // یافتن آیتم مورد نظر
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // مسیردهی تصویر (هم برای حالت جدید و هم قبلی)
    let imagePath = req.file ? req.file.path.replace(/\\/g, "/") : item.img;

    // اطمینان از وجود / در ابتدای مسیر
    if (imagePath && !imagePath.startsWith("/")) {
      imagePath = "/" + imagePath;
    }

    const updatedData = {
      name: req.body.name || item.name,
      price: req.body.price || item.price,
      category: req.body.category || item.category,
      recipe: req.body.recipe || item.recipe,
      img: imagePath, // مسیر به‌روز شده
    };

    const updatedItem = await Item.findOneAndUpdate({ _id: id }, updatedData, { new: true });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Item.findOneAndDelete({ _id: id });
    if (!deleteItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(deleteItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllItems = async (req, res) => {
  try {
    const result = await Item.deleteMany({});

    res.json({
      message: `${result.deletedCount} categories were deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllItems, addItem, getItem, deleteItem, updateItem, deleteAllItems };
