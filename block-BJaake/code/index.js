let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let root = document.querySelector('.newsContainer');
let select = document.querySelector('select');
let allNews = [];

function renderNews(news) {
  root.innerHTML = '';
  news.forEach((newsItem) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = newsItem.imageUrl;
    img.alt = newsItem.imageUrl;
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = newsItem.newsSite;
    let p = document.createElement('p');
    p.innerText = newsItem.title;
    let a = document.createElement('a');
    a.href = newsItem.url;
    a.innerText = 'Read More';
    div.append(span, p, a);
    li.append(img, div);
    root.append(li);
  });
}

function displayOptions(sources) {
  sources.forEach((source) => {
    let option = document.createElement('option');
    option.innerText = source;
    option.value = source;
    select.append(option);
  });
}

fetch(url)
  .then((res) => res.json())
  .then((news) => {
    renderNews(news);
    allNews = news;
    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    displayOptions(allSources);
  });

select.addEventListener('change', (event) => {
  let source = event.target.value.trim();
  let filterNews;
  if (source) {
    filterNews = allNews.filter((news) => news.newsSite === source);
  } else {
    filterNews = allNews;
  }
  renderNews(filterNews);
});
