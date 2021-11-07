const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    seoTitle: {
      type: String,
      slug: "title",
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
