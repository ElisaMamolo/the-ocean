const express = require("express");
const router = express.Router();

const Nft = require("../models/Nft.model.js");
const User = require("../models/User.model.js");

router.get("/nfts", (req, res, next) => {
  Nft.find()
    .then((allTheNftsFromDB) => {
      res.render("nft/list.hbs", { nfts: allTheNftsFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  
  User.find()
    .then((allTheUsersFromDB) => {
      res.render("nft/create", { users: allTheUsersFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/create", (req, res, next) => {
  const { name, image, owner, creator, price } = req.body;

  Nft.create({ name, image, owner, creator, price })
    .then(() => res.redirect("/nft/nfts"))
    .catch((error) => next(error));
});

router.get("/nfts/:nftId/edit", (req, res, next) => {
  
  const { nftId } = req.params;

  Nft.findById(nftId)
    .then((nftToEdit) => {
      User.find()
      .then((allTheUsersFromDB) => {
      res.render("nft/update-form", { nft: nftToEdit, users: allTheUsersFromDB });
    })
    .catch((error) => next(error));
  });
});

router.post("/nfts/:nftId/edit", (req, res, next) => {
  const { nftId } = req.params; 
  const { name, image, owner, creator, price } = req.body;

  Nft.findByIdAndUpdate(
    nftId,
    { name, image, owner, creator, price },
    { new: true }
  )
    .then((updatedNft) => res.redirect("/nft/nfts"))
    .catch((error) => next(error));
});

router.post("/nfts/:nftId/delete", (req, res, next) => {

  const { nftId } = req.params;

  Nft.findByIdAndDelete(nftId)
    .then(() => res.redirect("/nft/nfts"))
    .catch((error) => next(error));
});

module.exports = router;
