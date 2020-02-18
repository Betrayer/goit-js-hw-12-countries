import countryTemplate from './countryTemplate.hbs';
import fetchCountries from './fetchCountries.js';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import { debounce } from 'lodash';
import './styles.css';

const inputForm = document.querySelector('input');
inputForm.addEventListener('input', _.debounce(createTemplate, 500));
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
    console.log('At least there is no errors');
  } else if (array.length === 1) {
    whereToAdd.insertAdjacentHTML(
      'afterbegin',
      array.reduce((acc, element) => (acc += countryTemplate(element)), ''),
    );
  }
}
