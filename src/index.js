import './css/styles.css';
import Notiflix from 'notiflix';
import _ from 'lodash';
import FetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
input: document.querySelector("#search-box"),
countryList: document.querySelector(".country-list"),
countryInfo: document.querySelector(".country-info"),
};
const fetchCountries = new FetchCountries();

refs.input.addEventListener("input", _.debounce((onSearch), DEBOUNCE_DELAY));
function onSearch (event) {
    event.preventDefault();
    if(event.target.value.trim()){
    fetchCountries.names = event.target.value.trim();
    fetchCountries.fetchCountries();
    fetchCountries.fetchCountries().then(countries=>{
        if(countries.length>10){
            refs.countryInfo.innerHTML="";
    refs.countryList.innerHTML="";
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
       return;
        }
        else if(countries.length>1&&countries.length<=10){
            return appendCountriesList(countries);
        }
        else if(countries.length===1){
            return appendCountryInfo(countries);
        }
        })
        .catch(error=>{
            refs.countryInfo.innerHTML="";
            refs.countryList.innerHTML="";
                Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}}

function appendCountriesList(countries){
    console.log(countries);
    refs.countryInfo.innerHTML="";
    refs.countryList.innerHTML="";
    const markup = countries
  .map((country) => 
  `<li class="list-item">
  <img src="${country.flags.svg}" alt="flag" width="60">
  ${country.name.official}</li>`)
  .join("");
  refs.countryList.insertAdjacentHTML("beforeend", markup); 
  
}

function appendCountryInfo(countries){
    console.log(countries);
    refs.countryList.innerHTML="";
    refs.countryInfo.innerHTML="";
    const markup = countries.map((country)=>
  `<div class="country-info">
  <h3 class="country-name"><img src="${country.flags.svg}" alt="flag" width="60">${country.name.official}</h3>
  <p class="country-in">Capital: <span class="country-span">${country.capital}</span></p>
  <p class="country-in">Population: <span class="country-span">${country.population}</span></p>
  <p class="country-in">Languages: <span class="country-span">${Object.values(country.languages)}</span></p>
  </div>`)
.join("");
  refs.countryInfo.insertAdjacentHTML("beforeend", markup); 
  console.log(refs.countryInfo);
}