require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//connect to mongoDB
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const dbURI = `mongodb+srv://${username}:${password}@nodeblog.wo7j5.mongodb.net/blogs?retryWrites=true&w=majority&appName=nodeblog`;

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
// Middleware to support PUT and PATCH via forms
app.use(methodOverride("_method"));

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
  console.log("🔥 :: Body ::", req.body);
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

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
