const router = require("express").Router();
const db = require("../models/books");

// seeds app for placeholder data 
router.get("/seed", (req, res) => {
  Book.insertMany([
    {
      title: "The Shinobi Initiative",
      description:
        "The reality-bending adventures of a clandestine service agency in the year 2166",
      year: 2014,
      quantity: 10,
      imageURL: "https://imgur.com/LEqsHy5.jpeg",
    },
    {
      title: "Tess the Wonder Dog",
      description: "The tale of a dog who gets super powers",
      year: 2007,
      quantity: 3,
      imageURL: "https://imgur.com/cEJmGKV.jpg",
    },
    {
      title: "The Annals of Arathrae",
      description:
        "This anthology tells the intertwined narratives of six fairy tales.",
      year: 2016,
      quantity: 8,
      imageURL: "https://imgur.com/VGyUtrr.jpeg",
    },
    {
      title: "W∀RP",
      description:
        "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
      year: 2010,
      quantity: 4,
      imageURL: "https://imgur.com/qYLKtPH.jpeg",
    },
  ])
    .then(
      res.status(200).json({
        message: "Seed successful",
      })
    )
    .catch(
      res.status(400).json({
        message: "Seed unsuccessful",
      })
    );
});

// route that gets all books in database
router.get("/books", async (req, res) => {
  try {
    const books = await db.Books.find().orFail();
    res.json(books);
  } catch (error) {
    res.status(400).send(error).json({ message: "Couldn't Find Books..." });
  }
});

// route that gets a book from a unique id in the url
router.get("/books/:id", async (req, res) => {
  try {
    const book = await db.Books.findById(req.params.id).orFail();
    res.json(book);
  } catch (error) {
    res.status(400).send(error).json({ message: "Couldn't Find Book..." });
  }
});

// route that updates a book in database
router.put("/books/:id", async (req, res) => {
  try {
    const book = await db.Books.updateOne(
      { _id: req.params.id },
      req.body
    ).orFail();
    res.json(book);
  } catch (error) {
    res.status(400).send(error).json({ message: "Couldn't Update Book..." });
  }
});

// route that deletes a book in the database
router.delete("/:id", async (req, res) => {
  try {
    const book = await db.Books.deleteOne({ _id: req.params.id }).orFail();
    res.json({ message: "Book Has Been Deleted..." });
  } catch (error) {
    res.status(400).send(error).json({ message: "Couldn't Delete Book..." });
  }
});

// route that creates a new book and adds to database
router.post("/", async (req, res) => {
  try {
    const book = await db.Books.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).send(error).json({ message: "Couldn't Create Book" });
  }
});

module.exports = router;
