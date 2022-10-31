const fs = require('fs');
const html = fs.readFileSync('index.html', { encoding: 'utf8' });

/**
 * Returns an HTML page containing an interactive Web-based
 * tutorial. Visit the function URL to see it and learn how
 * to build with lambda.
 */
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html + JSON.stringify(event.body),
  };
  return response;
};
