import axios from 'axios'

console.log("load");

const applicationID = '5d273e332e281eef2b38c20797140170c1811a335b235b851a6c2c4821571c87'
const secret = '919a996fc16bf3a09b9c53f61a2e60c51af5b1023136899e131d1c49e6ee85c3'

const client = axios.create({
  baseURL: 'https://api.unsplash.com/',
  timeout: 10000,
  headers: { 'Authorization': 'Client-ID ' + applicationID }
});

export default {
  async fetch () {
    const response = await client.get('/photos')
    return response.data
  }
}
