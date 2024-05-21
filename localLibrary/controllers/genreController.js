const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");
const genre = require("../models/genre");


exports.genre_list = asyncHandler(async (req, res, next) => {
  const genreList = await Genre.find().sort({name: 1}).exec()
  res.render("genre_list", {title: "Genre List", genre_list: genreList})
});


exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    // No results.
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_books: booksInGenre,
  });
});


exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};


exports.genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const genreExists = await Genre.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect(genre.url);
      }
    }
  }),
];


// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {

  const [genre, allBooksWithGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({genre: req.params.id}).exec()
    ])

if (genre === null) {
  // No results.
  res.redirect("/catalog/genres");
}

res.render("genre_delete", {
  title: "Delete Genre",
  genre: genre,
  books: allBooksWithGenre,
});

});


exports.genre_delete_post = asyncHandler(async (req, res, next) => {

  const [genre, allBooksWithGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }).exec(),
    ]);

  if (allBooksWithGenre.length > 0) {
    res.render("genre_delete", {
      title: "Delete Book",
      genre: genre,
      books: allBooksWithGenre,
    });
    return;

  } else {
    await Genre.findByIdAndDelete(req.body.genreid);
    res.redirect("/catalog/genres");
  }
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec()

  if(genre === null){
    const err = new Error('Genre not found')
    err.status = 404;
    return next(err)
  }

  res.render("genre_form", {
    title: "Update genre",
    genre: genre,
  })
});


exports.genre_update_post = [

  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);


    const newGenre = new Genre({
      name: req.body.name,
      _id: req.params.id, 
    });

    if (!errors.isEmpty()) {
      const genre = await Genre.findById(req.params.id)
      res.render("genre_form", {
        title: "Update Genre",
        genre: genre,
        errors: errors.array(),
      });

      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, newGenre, {});
      res.redirect(updatedGenre.url);
    }
  }),
];
