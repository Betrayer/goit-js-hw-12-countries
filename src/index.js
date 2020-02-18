import countryTemplate from './countryTemplate.hbs';
import fetchCountries from './fetchCountries.js';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import debounce from 'lodash.debounce';
import './styles.css';

const inputForm = document.querySelector('input');
inputForm.addEventListener('input', debounce(createTemplate, 500));
const whereToAdd = document.querySelector('.countries__list');

function createTemplate(event) {
  if (event.target.value === '') {
    whereToAdd.innerHTML = '';
    return;
  }
  fetchCountries(event.target.value, countryResult);
}
function countryResult(array) {
  if (array.length >= 10) {
    PNotify.error({
      text: 'Try to be more specific!',
    });
  } else if (array.length > 1 && array.length <= 10) {
    clearResults();
    whereToAdd.insertAdjacentHTML(
      'afterbegin',
      array.reduce((acc, element) => (acc += `<li>${element.name}</li>`), ''),
    );
    PNotify.closeAll();
  } else if (array.length === 1) {
    clearResults();
    whereToAdd.insertAdjacentHTML(
      'afterbegin',
      array.reduce((acc, element) => (acc += countryTemplate(element)), ''),
    );
    PNotify.closeAll();
  }
}

function clearResults() {
  whereToAdd.innerHTML = '';
}
