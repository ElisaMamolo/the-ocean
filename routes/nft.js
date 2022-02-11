const express = require("express");
const router = express.Router();

const Nft = require("../models/Nft.model.js");
const User = require("../models/User.model.js");

//Create NFT Route
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

//Edit NFT Route
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

  //Align user portfolios
  Nft.findById(nftId).then((nftToEdit) => {
    if (nftToEdit.owner != owner) {
      Nft.findById(nftId)
        .then((dbNft) => {
          return User.findByIdAndUpdate(owner, { $push: { asset: dbNft._id } });
        })
        .catch((error) => next(error));
      User.findByIdAndUpdate(
        nftToEdit.owner,
        { $pull: { asset: nftToEdit._id } },
        { new: true }
      )
        .then((foundUser) => {})
        .catch((error) => next(error));
    }
  });

  //Apply NFT changes
  Nft.findByIdAndUpdate(
    nftId,
    { name, image, owner, creator, price },
    { new: true }
  )
    .then((updatedNft) => {
      req.session.message = {
        type: "success",
        intro: "Edited!",
        message: "",
      };
      res.redirect("/");
    })
    .catch((error) => next(error));
});

//Delete NFT Route
router.post("/nfts/:nftId/delete", (req, res, next) => {
  const { nftId } = req.params;

  Nft.findById(nftId).then((foundNFT) => {
    User.findByIdAndUpdate(
      foundNFT.owner,
      { $pull: { asset: foundNFT._id } },
      { new: true }
    )
      .then((foundUser) => {})
      .catch((error) => next(error));
  });
  Nft.findByIdAndDelete(nftId)
    .then(() => {
      req.session.message = {
        type: "warning",
        intro: "Deleted!",
        message: "",
      };
      res.redirect("/");
    })
    .catch((error) => next(error));
});

//Buy NFT Route
router.post("/nfts/:nftId/buy", (req, res, next) => {
  const { nftId } = req.params;

  Nft.findById(nftId).then((nftToEdit) => {
    User.findById(nftToEdit.owner).then((nftSeller) => {
      if (req.session.user.shells < nftToEdit.price) {
        req.session.message = {
          type: "danger",
          intro: "Cannot afford!",
          message: "Please get more SeaShells to buy this item",
        };
        return res.redirect("/");
        //!User feedback - Cannot afford NFT
      } else if (nftToEdit.owner == req.session.user._id) {
        //!User feedback - User already own this NFT
        req.session.message = {
          type: "danger",
          intro: "It's yours!",
          message: "You already own this item",
        };
        return res.redirect("/");
      } else {
        //Purchase process approved

        //remove NFT from sells portfolio
        Nft.findById(nftId)
          .then((dbNft) => {
            return User.findByIdAndUpdate(
              dbNft.owner,
              {
                $pull: { asset: dbNft._id },
                shells: (nftSeller.shells += nftToEdit.price),
              },
              { new: true }
            );
          })
          .then((seller) => {})
          .catch((error) => next(error));

        //apply NFT to buyers portfolio
        Nft.findById(nftId)
          .then((dbNft) => {
            return User.findByIdAndUpdate(req.session.user._id, {
              $push: { asset: dbNft._id },
              shells: (req.session.user.shells -= nftToEdit.price),
            });
          })
          .catch((error) => next(error));

        //apply new owner to NFT
        Nft.findByIdAndUpdate(
          nftId,
          { owner: req.session.user._id },
          { new: true }
        )
          .then((updatedNft) => res.redirect("/"))
          .catch((error) => next(error));
      }
    });
  });
});

module.exports = router;
