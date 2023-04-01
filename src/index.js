import './css/styles.css';
import API from './js/fetchCountries';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

function checkAPI(e) {
  const userInput = e.target.value.trim();
  if (userInput === '') {
    countryList.innerHTML = '';
  }

  API.fetchCountries(userInput).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length > 1 && data.length <= 10) {
      console.log(data);
      data.forEach(item => {
        const ul = document.createElement('ul');
        ul.innerHTML = `
       <p> <img src=${item.flags}/>  <b> ${item.name.common} </b> </p>
        `;
        countryList.append(ul);
        return;
      });
    } else if (data.length == 1) {
      countryList.innerHTML = '';
      data.forEach(item => {
        const h1 = document.createElement('h1');
        h1.innerHTML = `<p><img src=${item.flags}/> <b>${item.name.common}</b></p>`
        const ul = document.createElement('ul');
        ul.innerHTML = `
       <p><b> capital:</b> ${item.capital} </p>
        <p><b> population:</b> ${item.population} </p>
        <p><b> languages:</b> ${item.languages} </p>
        `;
        countryList.append(h1, ul);
        return;
      }); 
    } else {
      countryList.innerHTML = '';
      Notiflix.Notify.failure("Oops, there is no country with that name");
      return;
    }
  });
}
inputEl.addEventListener('input', checkAPI, DEBOUNCE_DELAY);
