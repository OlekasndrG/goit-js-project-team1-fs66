// шаблон-рендера
/*
results.map(({id, media, title, published_date, abstract, url, section})=>`<li class='articles-list-item' id='${id}'>
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
</li>`).join('');
*/
