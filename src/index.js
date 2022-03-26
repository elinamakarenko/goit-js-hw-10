import './css/styles.css';
import Notiflix from 'notiflix';
import _ from 'lodash';
import FetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
// Notiflix.Notify.failure("Oops, there is no country with that name");

// Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
const refs = {
input: document.querySelector("#search-box"),
countryList: document.querySelector(".country-list"),
countryInfo: document.querySelector(".country-info"),
};
const fetchCountries = new FetchCountries();

refs.input.addEventListener("input", _.debounce((onSearch), DEBOUNCE_DELAY));
function onSearch (event) {
    event.preventDefault();
    fetchCountries.names = event.target.value;
    fetchCountries.fetchCountries();
}