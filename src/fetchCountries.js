export default class FetchCountries {
    constructor(){
        this.name = "";
    }

fetchCountries() {
const BASE_URL = "https://restcountries.com/v3.1/";
 return fetch(`${BASE_URL}name/${this.name}?fields=name,capital,population,flags,languages`)
.then(r=>r.json())
.then(resolve =>{
    if(resolve.status===404){
        throw new Error(resolve.status);
    }
    return resolve;
})
}

get names (){
    return this.name;
}

set names (newName){
this.name = newName;
}
}