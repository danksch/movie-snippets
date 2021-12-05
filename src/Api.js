const API_KEY = "k_9omwph2w";

class Api {
  static searchMovie(query) {
    return `https://imdb-api.com/en/API/SearchMovie/${API_KEY}/${query}`;
  }
  static searchSeries(query) {
    return `https://imdb-api.com/en/API/SearchSeries/${API_KEY}/${query}`;
  }
}

export default Api;
