const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const username = encodeURIComponent("<leogytis>");
const password = encodeURIComponent("<test123>");

//express app
const app = express();

//connect to mongoDB

const dbURI =
  "mongodb+srv://leogytis:test123@nodeblog.wo7j5.mongodb.net/?retryWrites=true&w=majority&appName=nodeblog";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Beuty Blog",
    snippet: "about new blog",
    body: "body is my bew blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("6790012b1923451dc94ee2ba")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  console.log("🔥 :: path ::", req.path);
  console.log("🔥 :: method ::", req.method);
  next();
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
  //   const blogs = [
  //     {
  //       title: "Yoshi finds eggs",
  //       snippet: "Yoshi finds eggs to bake some cake",
  //     },
  //     {
  //       title: "Mario finds stars",
  //       snippet: "Mario finds stars to save the princess",
  //     },
  //     {
  //       title: "How to defeat bowser",
  //       snippet: "To defeat bowser, you need to find the secret axe",
  //     },
  //   ];
  //   res.render("index", {
  //     title: "Home",
  //     blogs,
  //   });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create new blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      console.log("🔥 :: result ::", result);
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log("🔥 :: err ::", err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log("🔥 :: err ::", err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log("🔥 :: err ::", err);
    });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
