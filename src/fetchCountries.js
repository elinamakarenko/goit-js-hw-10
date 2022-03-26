export default class FetchCountries {
    constructor(){
        this.name = "";
    }

fetchCountries() {
const BASE_URL = "https://restcountries.com/v3.1/";
 fetch(`${BASE_URL}name/${this.name}`)
.then(r=>r.json())
.then(console.log);
}

get names (){
    return this.name;
}

set names (newName){
this.name = newName;
}
}