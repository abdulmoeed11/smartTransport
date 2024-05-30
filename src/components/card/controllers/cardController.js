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

const loadBalance = asyncHandler(async (req, res, next) => {
  const { csn, amount } = req.body;
  if (!csn || amount === undefined) {
    res.status(400);
    throw new Error("csn and balance should be provided");
  } else {
    if (amount > 0) {
      const card = await Card.findOne({ csn });
      if (card) {
        card.balance += amount;
        await card.save();
        res.json({
          _id: card._id,
          csn: card.csn,
          balance: card.balance,
          updatedAt: card.updatedAt,
        });
      } else {
        res.status(404);
        throw new Error("Card not found");
      }
    } else {
      res.status(400);
      throw new Error("Balance should be greater than 0");
    }
  }
});

// Controller to deduct balance from a card
const deductBalance = asyncHandler(async (req, res) => {
  const { csn, amount } = req.body;

  if (!csn || amount === undefined) {
    res.status(400);
    throw new Error("Card CSN and amount are required");
  }

  const card = await Card.findOne({ csn });

  if (!card) {
    res.status(404).json({
      message: "Card not found",
    });
    return;
  }

  if (card.balance < amount) {
    res.status(400).json({
      message: "Insufficient balance",
      card: {
        _id: card._id,
        csn: card.csn,
        balance: card.balance,
        updatedAt: card.updatedAt,
      },
    });
    return;
  }

  card.balance -= amount;

  await card.save();

  res.status(200).json({
    _id: card._id,
    csn: card.csn,
    balance: card.balance,
    updatedAt: card.updatedAt,
  });
});

module.exports = { registerCard, loadBalance, deductBalance };
