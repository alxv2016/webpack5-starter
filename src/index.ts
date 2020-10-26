import './scss/app.scss';
import _ from 'lodash';

function component(): HTMLElement {
  const element = document.createElement('div');
  console.log(process.env.DB_HOST);
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello webpack!!!!!!';
  element.classList.add('hello');
  return element;
}
// test hot
document.body.appendChild(component());
