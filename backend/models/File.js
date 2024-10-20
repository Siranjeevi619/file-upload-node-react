const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  fileName: { type: String, required: true },
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
