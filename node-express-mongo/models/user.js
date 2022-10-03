const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 0,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (course) {
  const items = [...this.cart.items];
  items.findIndex((c) => {
    c.courseId.toString() === course._id.toString();
  });
  if (idx >= 0) {
    items[idx].count = items[idx].count + 1;
  } else {
    items.push({
      courseId: course._id,
      count: 1,
    });
  }

  // const newCart = { items: items };
  // this.cart = newCart;

  this.cart = { items };

  return this.save();
};

module.exports = model("User", userSchema);
