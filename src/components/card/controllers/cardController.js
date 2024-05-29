const asyncHandler = require("express-async-handler");
const Card = require("../models/Card");

const registerCard = asyncHandler(async (req, res, next) => {
  const { csn, balance } = req.body;
  const cardExists = await Card.findOne({ csn });
  if (cardExists) {
    res.status(400);
    throw new Error("Card with this CSN already existss");
  } else {
    var card;
    if (balance) {
      card = await Card.create({
        csn: csn,
        balance: balance,
      });
    } else {
      card = await Card.create({
        csn: csn,
      });
    }
    if (card) {
      res.status(201).json({
        _id: card._id,
        csn: card.csn,
        balance: card.balance,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid card data");
    }
  }
});

module.exports = { registerCard };
