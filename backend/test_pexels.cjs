const fs = require('fs');
const path = require('path');
require('dotenv').config();

const apiKey = process.env.PEXELS_API_KEY;

async function test() {
  const ids = ['32863758','32734580','32704030','31545115'];
  for (const id of ids) {
    try {
      const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
        headers: { 'Authorization': apiKey }
      });
      console.log(`Photo ${id} Status:`, res.status);
      if (res.ok) {
        const data = await res.json();
        console.log(`- Photographer: ${data.photographer}`);
      }
    } catch (e) {
      console.log('Error:', e.message);
    }
  }
}

test();
