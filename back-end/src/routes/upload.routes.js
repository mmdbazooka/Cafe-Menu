const express = require("express");
const upload = require("../config/multer.config");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post("/", upload.single("img"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.status(200).json({
    message: "File uploaded successfully.",
    filePath: `/uploads/${req.file.filename}`,
  });
});

router.get("/", (req, res) => {
  const uploadsDir = path.resolve(__dirname, "../../uploads");

  fs.access(uploadsDir, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(500).json({ message: "Upload directory does not exist." });
    }

    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        return res.status(500).json({ message: "Unable to read upload directory." });
      }

      res.status(200).json({
        files: files,
      });
    });
  });
});

router.get("/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve(__dirname, "../../uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found." });
    }

    res.sendFile(filePath);
  });
});

router.delete("/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve(__dirname, "../../uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found." });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Unable to delete file." });
      }

      res.status(200).json({ message: "File deleted successfully." });
    });
  });
});

module.exports = router;
