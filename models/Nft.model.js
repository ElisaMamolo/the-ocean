const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const nftSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    image: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    creator: String,
    price: Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Nft = model("Nft", nftSchema);

module.exports = Nft;
