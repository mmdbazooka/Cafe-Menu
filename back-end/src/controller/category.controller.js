const Category = require("../models/category.model");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const findCategory = await Category.findOne({ _id: id });

    if (!findCategory) {
      return res.status(404).json({ message: "category not found" });
    }

    res.json(findCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const item = new Category({
      ...req.body,
      img: req.body.img ? req.body.img : null,
    });
    const savedItem = await item.save();

    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.findOneAndDelete({ _id: id });
    if (!deleteCategory) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(deleteCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedData = {
      name: req.body.name || category.name,
      img: req.file ? req.file.path : category.img,
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    const result = await Category.deleteMany({}); // حذف همه دسته‌بندی‌ها

    res.json({
      message: `${result.deletedCount} categories were deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCategories, addCategory, getCategory, deleteCategory, updateCategory, deleteAllCategories };
