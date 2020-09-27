const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 10,
    max: 80,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
  },
  email: String,
  hobbies: [String],
  collage: String,
  enterDate: {
    type: Date,
    default: Date.now(),
  },
});

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;
