const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    isAdmin: { type: Boolean, default: false },
    shells: Number,
    asset: [{ type: Schema.Types.ObjectId, ref: "Nft" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
