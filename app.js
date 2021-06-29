const { scrapeLink } = require('./index');

const exec = async () => {
  const pr = await scrapeLink('https://github.com');
  console.log(pr);
};

exec();
