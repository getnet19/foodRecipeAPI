const mongodb = require("mongoose");
// const autoIncrement  = require("mongoose-auto-increment");

const recipeScema = new mongodb.Schema(
  {
    createdById: {
      type: mongodb.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    title: {
      type: String,
      unique:true,
      required: true,
    },
    videoURL: {
      type: String,
    },
    imageURL: {
      type: String,
      unique:true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cookingHour: {
      type: String,
      required: true,
    },
    preparationHour: {
      type: String,
      required: true,
    },
    ingridents: [
      {
        ingridentsImage: { type: String ,required:true},
        ingridentsAmount: { type: String,required:true },
        ingridentsTitle: { type: String ,required:true},
      },
    ],
    instructions: [
      {
        stepNumber: { type: Number,required:true },
        description: { type: String, required: true },
      },
    ],
    cathegory: [
      {name:{
        type: String,
        required: true,
      },}
    ],
    likes: [
      {
        userId: {
          type: mongodb.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    rating: [
      {
        userId: {
          type: mongodb.Schema.Types.ObjectId,
          ref: "User",
        },
        value: { type: Number, min: 1, max: 5 },
      },
    ],
    comments: [
      {
        userId: {
          type: mongodb.Schema.Types.ObjectId,
          ref: "User",
        },
        text: { type: String },
      },
    ],
    favorates: [
      {
        userId: {
          type: mongodb.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);


// recipeScema.plugin(autoIncrement.plugin, {
//     model: "Recipe",
//     field: "instructions.stepNumber",
//     startAt: 1,
//     incrementBy:1
//   });

module.exports = mongodb.model("Recipe", recipeScema);
