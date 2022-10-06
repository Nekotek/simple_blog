const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const kebab = require("./kebabcase.js")

const app = express();

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet interdum felis, et posuere felis lobortis a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin purus neque, rhoncus eget pulvinar at, cursus in nulla. Nulla in lorem ornare, sollicitudin mi id, maximus metus. Morbi suscipit ultricies dolor, vitae laoreet magna viverra at. In cursus nisl ex, ut auctor dolor semper a. Maecenas id sem volutpat, auctor metus sed, molestie urna. Sed malesuada tellus vel velit feugiat, at dapibus odio malesuada. Quisque vel justo felis.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet interdum felis, et posuere felis lobortis a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin purus neque, rhoncus eget pulvinar at, cursus in nulla. Nulla in lorem ornare, sollicitudin mi id, maximus metus. Morbi suscipit ultricies dolor, vitae laoreet magna viverra at. In cursus nisl ex, ut auctor dolor semper a. Maecenas id sem volutpat, auctor metus sed, molestie urna. Sed malesuada tellus vel velit feugiat, at dapibus odio malesuada. Quisque vel justo felis.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet interdum felis, et posuere felis lobortis a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin purus neque, rhoncus eget pulvinar at, cursus in nulla. Nulla in lorem ornare, sollicitudin mi id, maximus metus. Morbi suscipit ultricies dolor, vitae laoreet magna viverra at. In cursus nisl ex, ut auctor dolor semper a. Maecenas id sem volutpat, auctor metus sed, molestie urna. Sed malesuada tellus vel velit feugiat, at dapibus odio malesuada. Quisque vel justo felis.";

const postsArray = new Array();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    postsArray: postsArray
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.get("/posts/:post", (req, res) => {
  postsArray.forEach(function (element) {
    if (kebab(element.postTitle) === kebab(req.params.post)) {
      res.render("post", {
        title: element.postTitle,
        postText: element.postText
      });
    }
  })
});


app.post("/compose", (req, res) => {
  var post = {
    postTitle: req.body.postTitle,
    postText: req.body.postText
  };
  postsArray.push(post);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Up and running!");
});
