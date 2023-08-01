const axios = require('axios');

async function addRecordToAirtableBase() {
  const apiKey = 'key6UyJSQCDWbU2kl';
  const baseId = 'app8pxwQgL6nUlPZX';
  const tableName = 'Users';

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const recordData = {
    fields: {
      // Define your record fields here
      Name: 'John Doe',
      Email: 'johndoe@example.com',
      Age: 30
    }
  };

  try {
    const response = await axios.post(url, recordData, { headers });
    console.log('Record added successfully:', response.data);
  } catch (error) {
    console.error('Error adding record:', error);
  }
}

module.exports = addRecordToAirtableBase;
