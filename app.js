const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("🔥 :: path ::", req.path);
  console.log("🔥 :: method ::", req.method);
  next();
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Yoshi finds eggs to bake some cake",
      id: 1,
    },
    {
      title: "Mario finds stars",
      snippet: "Mario finds stars to save the princess",
      id: 2,
    },
    {
      title: "How to defeat bowser",
      snippet: "To defeat bowser, you need to find the secret axe",
      id: 3,
    },
  ];
  res.render("index", {
    title: "Home",
    blogs,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create new blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
