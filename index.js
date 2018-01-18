const readline = require('readline');
const fetch = require('node-fetch');

const url = 'https://mydevbox.chromeriver.com/apollo/expenseReportSummaries/?listType=DRAFT&sortOrder=ASC&sortColumn=createDate&pagingNumItems=1&pagingStartIndex=0&pagingResetCache=true';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

rl.question('Please provide a session cookie (example: cr_session_token_mydev=5e100b06-6cbf-467f-b71a-b70cc17a3cda)', (answer) => {
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
      console.log('status code: ', res.status);
    })
  }, 10000);


  rl.close();


});
