var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
const mongoose = require("mongoose");
const { flash } = require("express-flash-message");
var port = 3000;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var blogRouter = require("./routes/blogs");

var app = express();

const dbUri =
  "mongodb+srv://nikkofe:niks12345678@blog-express.uzb1f.mongodb.net/blog-express?retryWrites=true&w=majority";
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash({ sessionKeyName: "flashMessage" }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // res.send("<h1>anj</h1>");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
