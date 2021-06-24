const fetch = require('node-fetch');
const cheerio = require('cheerio');

const scrapeLink = async (URL) => {
  let response = await fetch(URL);
  let body = await response.text();
  const $ = cheerio.load(body);

  let preview = {
    title: getTitle($),
    description: getDescription($),
    url: getURL($),
    image: getImage($),
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

const getImage = ($) => {
  const ogImage = $('meta[property="og:image"]').attr('content');
  const twitterImage = $('meta[name="twitter:image:src"]').attr('content');
  const twitterImage2 = $('meta[name="twitter:image"]').attr('content');
  return { ogImage, twitterImage, twitterImage2 };
};

scrapeLink('https://amazon.com');
