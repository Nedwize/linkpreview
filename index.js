const fetch = require('node-fetch');
const cheerio = require('cheerio');

const scrapeLink = async () => {
  let response = await fetch(`https://github.com`);
  let body = await response.text();
  const $ = cheerio.load(body);
  const title = getTitle($);
  const description = getDescription($);
  const url = getURL($);

  let preview = {
    title,
    description,
    url,
  };
  console.log(preview);
};

const getTitle = ($) => {
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  const documentTitle = $('title').text();
  const heading = $('h1').text();
  return { ogTitle, twitterTitle, documentTitle, heading };
};

const getDescription = ($) => {
  const ogDescription = $('meta[property="og:description"]').attr('content');
  const twitterDescription = $('meta[name="twitter:description"]').attr(
    'content'
  );
  const documentDescription = $('meta[name="description"]').attr('content');
  return {
    ogDescription,
    twitterDescription,
    documentDescription,
  };
};

const getURL = ($) => {
  const ogURL = $('meta[property="og:url"]').attr('content');
  const canonicalURL = $('link[rel=canonical]').attr('href');
  return { ogURL, canonicalURL };
};

scrapeLink();
