process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch');

const interval = 10 * 1000;
const url = 'https://mydevbox.chromeriver.com/apollo/expenseReportSummaries/?listType=DRAFT&sortOrder=ASC&sortColumn=createDate&pagingNumItems=1&pagingStartIndex=0&pagingResetCache=true';

const errorMsg = 'ooh shit';
const successMsg = 'oooh aaah ahh ahh i m still aliiive';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const request = (cookie) => {
  return fetch.bind(this, url, {
    headers: {
      cookie: cookie,
      'chain-id': 'a500-e50b-c53f-6041-112a'
    },
    agent: false
  });
};

const start = (cookie) => {
  const makeRequest = request();
  const success = () => console.log(successMsg);
  const error = () => console.error(errorMsg);
  const loop = () => makeRequest().then(success).catch(error);
  loop();
  return setInterval(loop, interval);
};

const writeToken = (cookie) => {
  fs.writeFileSync('.token', cookie);
};

const readToken = (cookie) => {
  try {
    return fs.readFileSync('.token', cookie);
  } catch(e) {
    return undefined;
  }
};

const promptMsg = (cookie) => {
  return [
    'Provide a session cookie (cr_session_token_mydev)',
    'example: 5e100b06-6cbf-467f-b71a-b70cc17a3cda',
    cookie ? 'or just ENTER to use your last one\n' : '\n'
  ].join('\n');
};

rl.question(promptMsg(readToken()), (cookie) => {
  cookie = cookie.length ? cookie : readToken();
  writeToken(cookie);
  start(cookie);
  rl.close();
});
