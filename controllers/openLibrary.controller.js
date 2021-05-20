const openLibraryService = require("../services/openLibrary.service");

const toModel = async (element, db) => {
  try {
    const bookObject = {};
    const authorObject = {};

    bookObject.title = element.title;
    bookObject.isbn = element.isbn[0];

    authorObject.first_name = element.author_name[0]
      .split(" ")
      .slice(0, -1)
      .join(" ");
    authorObject.last_name = element.author_name[0]
      .split(" ")
      .slice(-1)
      .join(" ");

    bookObject.publisher = element.publisher[0];
    bookObject.release_date = new Date(element.publish_date[0]);

    const coverID = element.cover_i;
    if (coverID) {
      try {
        const url = openLibraryService.getCoverURLByID(coverID);

        bookObject.cover_art = url;
      } catch (error) {}
    }

    const author = (await db.author.findOrCreate({ where: authorObject }))[0];
    const book = (await db.book.findOrCreate({ where: bookObject }))[0];

    let genres = [];
    for (let index = 0; index < element.subject?.length; index++) {
      const genre = (
        await db.genre.findOrCreate({
          where: { genre: element.subject[index].toLowerCase() },
        })
      )[0];
      genres.push(genre);

      await book.setGenres(genre);
    }

    await book.setAuthors(author);
    book.authors = [author];
    book.genres = genres;
    return book;
  } catch (error) {
    return;
  }
};

const convertRequestDocsToModels = async (docs,db) => {
  let results = [];
  for (let index = 0; index < docs.length; index++) {
    const object = await toModel(docs[index], db);

    if (object) {
      const json = object.toJSON();
      json.authors = object.authors.map((element) => element.toJSON());
      json.genres = object.genres.map((element) => element.toJSON());
      results.push(json);
    }
  }

  return results;
};

const parseRequest = async (req, db) => {
  const queryParams = req.query;

  if (queryParams.query) {
    const response = await openLibraryService.search(queryParams.query);
    if (response.docs) {
      return convertRequestDocsToModels(response.docs,db);
    }
    return response;
  }
  if (queryParams.title) {
    return openLibraryService.searchByTitle(queryParams.title);
  }
  if (queryParams.author) {
    return openLibraryService.searchByAuthor(queryParams.author);
  }

  //We may want to use route parameters for these instead, rather than search params.
  //Just putting these here for now.
  if (queryParams.bookKey) {
    return openLibraryService.getBookByKey(queryParams.bookKey);
  }
  if (queryParams.isbn) {
    return openLibraryService.getBookByISBN(queryParams.isbn);
  }
  if (queryParams.cover) {
    return openLibraryService.getCoverURLByID(queryParams.cover);
  }
  if (queryParams.genre){
    return openLibraryService.getBookByCategory(queryParams.genre)
  }
};

module.exports = {
  parseRequest,
};
