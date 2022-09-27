const PORT = process.env.port || 3003;
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const exhbs = require("express-handlebars");
const app = express();
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cardRoutes = require("./routes/card");

const hbs = exhbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine); // регистрация движка
app.set("view engine", "hbs"); // установка движка
app.set("views", "views"); // установка для папки views

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);

async function start() {
  try {
    const password = "-";
    const url = `mongodb+srv://Arah3lm:${password}@maximgrekkstudy.r0be1yx.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is working on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
