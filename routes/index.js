const router = require("express").Router();

const Nft = require("../models/Nft.model.js");

router.get("/", (req, res, next) => {
  Nft.find()
    .then((allTheNftsFromDB) => {
      if (req.session.user) {
        res.render("index", {
          userInSession: req.session.user,
          nfts: allTheNftsFromDB,
        });
      } else {
        res.render("index", { nfts: allTheNftsFromDB });
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
