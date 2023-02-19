const KEY = 'lN1jAQVvVGOPSqcIQoMHMLLJA9oE1Rka';
const MOST_POPULAR_NEWS = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${KEY}`;



async function getPopularArticle() {
    const articleFetch = await fetch(MOST_POPULAR_NEWS);
    const articles = await articleFetch.json();
    let { results } = articles;
    // console.log(results);
    
    const articlesCardsArr = results.map(({id, media, title, published_date, abstract, url, section})=>`<li class='articles-list-item' id='${id}'>
    <article class='articles-item-news'>

            <div class='articles-news-wrapper'>
                <img class='articles-img-news'  src='${media}' alt=''/>
                <p class="articles-news-category">${section}</p> 
                <button type='button'>
                    <span> add favorite
                        <svg></svg>
                    </span> 
                </button> 
            </div> 

            <div>  
                <h2 class='articles-tittle-news'>${title}</h2>
                <p class='articles-text-news'>${abstract}</p>
            </div>

            <div>
                <span class='articles-date-news'>${published_date.split('')
                .splice(0, 10)
                .join('')
                .replaceAll('-', '/')}</span>
                <a target='blank' class='articles-link-news'  href='${url}'>Read more</a>
            </div>
    </article>
</li>`).join(' '); 

updateNewArticles(articlesCardsArr);
};

getPopularArticle();

function updateNewArticles(articlesCardsArr) {
    // document.querySelector('.country-list').innerHTML = articlesCardsArr;
};
