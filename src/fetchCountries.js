export default fetchCountries;

function fetchCountries(searchQuery, callback) {
  const defaultUrl = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  fetch(defaultUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error(error);
    });
}
