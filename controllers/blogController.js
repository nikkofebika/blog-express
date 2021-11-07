const BlogModel = require("../models/blog");
const index = (req, res) => {
  BlogModel.find()
    .then(async (result) => {
      const flashMessage = await req.consumeFlash("flashMessage");
      //   console.log("flashMessage", flashMessage[0]);
      res.render("console/blogs", {
        pageTitle: "Blogs Page",
        activeMenu: "blogs",
        blogs: result,
        flashMessage,
      });
    })
    .catch((err) => console.log("Error find blog", err));
};

const show = (req, res) => {
  BlogModel.findById(req.params.blogId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log("Error findById blog", err));
};

const create = (req, res) => {
  res.render("console/blogs/create", {
    pageTitle: "Create Blog",
    activeMenu: "blogs",
  });
};

const edit = (req, res) => {
  BlogModel.findById(req.params.blogId)
    .then((result) => {
      res.render("console/blogs/edit", {
        pageTitle: "Edit Blog",
        blog: result,
        activeMenu: "blogs",
      });
    })
    .catch((err) => console.log("error edit blog", err));
};

const store = (req, res) => {
  console.log(req.body);
  const blog = new BlogModel(req.body);

  blog
    .save()
    .then(async (result) => {
      await req.flash("flashMessage", {
        status: "success",
        message: "Blog saved successfully",
      });
      res.redirect("/blogs");
    })
    .catch((err) => console.log("Error save blog", err));
};

const update = (req, res) => {
  BlogModel.findById(req.params.blogId)
    .then((blog) => {
      blog.title = req.body.title;
      blog.description = req.body.description;
      blog.save().then(async (result) => {
        console.log("updated blog", result);
        await req.flash("flashMessage", {
          status: "success",
          message: "Blog updated successfully",
        });
        res.redirect("/blogs");
      });
    })
    .catch((err) => console.log("Error save blog", err));
};

const destroy = (req, res) => {
  BlogModel.findByIdAndDelete(req.params.blogId)
    .then(async (result) => {
      await req.flash("flashMessage", {
        status: "success",
        message: "Blog deleted successfully",
      });
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => console.log("error delete blog", error));
};

module.exports = { index, create, store, show, edit, update, destroy };
