import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+\..+/.test(v), 
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

const parentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true, 
  },
  children: [childSchema],
});

const BookMark = mongoose.models["bookmark"] || mongoose.model("bookmark", parentSchema);

export default BookMark;
