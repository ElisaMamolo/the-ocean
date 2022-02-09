const express = require("express");
const router = express.Router();

const Nft = require("../models/Nft.model.js");
const User = require("../models/User.model.js");

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
    //Adding NFT to owners assets
    .then((dbNft) => {
      return User.findByIdAndUpdate(owner, { $push: { asset: dbNft._id } });
    })
    .then(() => res.redirect("/"))
    .catch((error) => next(error));
});

router.get("/nfts/:nftId/edit", (req, res, next) => {
  const { nftId } = req.params;

  Nft.findById(nftId).then((nftToEdit) => {
    User.find()
      .then((allTheUsersFromDB) => {
        res.render("nft/update-form", {
          nft: nftToEdit,
          users: allTheUsersFromDB,
        });
      })
      .catch((error) => next(error));
  });
});

router.post("/nfts/:nftId/edit", (req, res, next) => {
  const { nftId } = req.params;
  const { name, image, owner, creator, price } = req.body;

  //! Did owner change
  //! if so: remove asset from previous owner
  //! Add asset to new owner

  Nft.findByIdAndUpdate(
    nftId,
    { name, image, owner, creator, price },
    { new: true }
  )
    .then((updatedNft) => res.redirect("/"))
    .catch((error) => next(error));
});

router.post("/nfts/:nftId/delete", (req, res, next) => {
  const { nftId } = req.params;

  Nft.findByIdAndDelete(nftId)
    .then(() => res.redirect("/"))
    .catch((error) => next(error));
});

// router.post("/nfts/:nftId/delete", (req, res, next) => {
//   const { nftId } = req.params;

//   Nft.findById(nftId).then((foundNFT) => {
//     User.findById(foundNFT.owner)
//       .populate("asset")
//       .then((foundUser) => {
//         console.log("Found User: " + foundUser);
//       });
//   });
// });

router.post("/nfts/:nftId/buy", (req, res, next) => {
  //! Can the user afford the NFT
  //! Deduct amount from account/userModel
  //! Remove NFT from owner
  //! Add seashells to the seller
  //! Add NFT to user asset array
  //! Change Owner on NFT

  const { nftId } = req.params;

  Nft.findById(nftId).then((nftToEdit) => {
    User.findById(nftToEdit.owner).then((nftOwner) => {
      console.log(nftOwner.username);
    });
  });
  console.log(req.params);
});

module.exports = router;
