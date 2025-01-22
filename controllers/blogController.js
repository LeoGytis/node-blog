const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_edit = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/edit", { blog: result, title: "Blog Edit page" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Blog not found" });
    });
};

const blog_edit_patch = (req, res) => {
  const id = req.params.id;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((result) => {
      res.status(200);
      res.redirect(`/blogs/${id}`);
    })
    .catch((err) => {
      console.log("🔥 :: err ::", err);
      res.status(500).json({ error: "Failed to update the blog" });
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_edit,
  blog_edit_patch,
  blog_delete,
};
