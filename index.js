const readline = require('readline');
const fetch = require('node-fetch');

const url = 'https://mydevbox.chromeriver.com/apollo/expenseReportSummaries/?listType=DRAFT&sortOrder=ASC&sortColumn=createDate&pagingNumItems=1&pagingStartIndex=0&pagingResetCache=true';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

rl.question('Please provide a session cookie ', (answer) => {
  const options = {
    headers: {
      cookie: answer,
      'chain-id': 'a500-e50b-c53f-6041-112a'
    },
    agent: false
  };
  setInterval(() => {
    fetch(url, options)
    .catch((error) => {
      console.log('ooh shit');
    })
    .then((res) => {
      console.log('oooh aaah ahh ahh i m still aliiive');
    })
  }, 10000);


  rl.close();


});
