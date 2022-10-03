// Порт
const PORT = process.env.port || 3003;
// Нативные зависимости ноды
const path = require("path");
// Зависимости и переменные различных библиотек
const mongoose = require("mongoose");
const express = require("express");
const exhbs = require("express-handlebars");
const app = express();
// Роуты
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
// Модели
const User = require("./models/user");

// Подключаем hds, настраиваем шаблонизатор
const hbs = exhbs.create({
  defaultLayout: "main",
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine("hbs", hbs.engine); // регистрация движка
app.set("view engine", "hbs"); // установка движка
app.set("views", "views"); // установка для папки views

// Middleware для нахождения юзера, отправления его в объект req
app.use(async (req, res, next) => {
  try {
    // костыль временный
    const user = await User.findById("63344090707ceae28287af03");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});
// Middleware для назначения статичной диектории public
app.use(express.static(path.join(__dirname, "public")));
// ?
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Middleware для подключения роутинга в приложение (первый параметр - начало пути для каждого отдельного роутера)
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/cart", cartRoutes);

// Функция запуска приложения
async function start() {
  try {
    // Подключение к MongoDB
    const password = "G753LMg753lm";
    const url = `mongodb+srv://Arah3lm:${password}@maximgrekkstudy.r0be1yx.mongodb.net/shop`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    // Попытка найти хоть одного пользователя
    const candidate = await User.findOne();
    // Если пользователя нет, то создать его
    if (!candidate) {
      const user = new User({
        email: "MaximGrekk@gmail.com",
        name: "Maxim",
        cart: {
          items: [],
        },
      });
      await user.save();
    }
    // Работа приложения на порте 3003
    app.listen(PORT, () => {
      console.log(`Server is working on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
