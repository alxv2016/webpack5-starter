import './scss/app.scss';
import _ from 'lodash';
import Axios from 'axios';

function component(): HTMLElement {
  const element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello webpack!!!!!!';
  element.classList.add('hello');
  return element;
}
console.log(process.env.API_URL, process.env.ACCESS_TOKEN);

async function getData() {
  const masterRef = await Axios.get(`${process.env.API_URL}`).then((resp) => {
    return resp.data.refs[0].ref;
  });

  const dataRef = Axios.get(`${process.env.API_URL}/documents/search`, {
    params: {ref: masterRef, access_token: process.env.ACCESS_TOKEN},
  }).then((resp) => {
    return resp.data.results;
  });
  return dataRef;
}
async function returnData() {
  const data = await getData();
  accessData(data);
}
returnData();

function accessData(data: any) {
  console.log(data);
}

// test hot
document.body.appendChild(component());
