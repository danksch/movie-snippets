const API_KEY = "k_9omwph2w";

class Api {
  // see https://imdb-api.com/api/#SearchMovie-header
  static searchMovie(query) {
    return `https://imdb-api.com/en/API/SearchMovie/${API_KEY}/${query}`;
  }
  // see https://imdb-api.com/api/#SearchSeries-header
  static searchSeries(query) {
    return `https://imdb-api.com/en/API/SearchSeries/${API_KEY}/${query}`;
  }
  // see https://imdb-api.com/api/#Ratings-header
  static getRating(id) {
    return `https://imdb-api.com/en/API/Ratings/${API_KEY}/${id}`;
  }
}

export default Api;
