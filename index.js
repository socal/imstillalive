const fetch = require('node-fetch');

const url = 'https://mydevbox.chromeriver.com/apollo/expenseReportSummaries/?listType=DRAFT&sortOrder=ASC&sortColumn=createDate&pagingNumItems=1&pagingStartIndex=0&pagingResetCache=true';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const options = {
  headers: {
    cookie: 'cr_session_token_mydev=5b2a66b1-e9b2-4b34-81cc-5e8dca3d6eef',
    'chain-id': 'a500-e50b-c53f-6041-112a'
  },
  agent: false
};


const makeNetworkRequest = () => {
  console.log('Making request');
  fetch(url, options)
  .then((res) => {
    console.log('oooh aaah ahh ooooahh i m still aliiive');
    console.log('status code: ', res.status);
  });
};

makeNetworkRequest();
setInterval(makeNetworkRequest, 20000);
