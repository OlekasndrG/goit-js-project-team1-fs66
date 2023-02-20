const ulCardList = document.querySelector('.list-news')


export function onRenderOneCard(arrayNews) {
console.log("🚀 ~ arrayNews:", arrayNews);

    const arrayCard = arrayNews.map((news, index) => {
        const {image, section, title, description, date, url} = news;
        const WETHER = '<li class="wether-a"></li>'
        const MARKUP = `<li class="list-news__item">
        <article class="item-news__article">
            <div class="item-news__wrapper-img">
                <img class="item-news__img" src="${image}" alt="">
                <p class="item-news__category">${section}</p>
                <p class="item-news__add-to-favorite">Add to favorite
                    <svg class="item-news__icon" width="16" height="16">
                        <use class="item-news__heart-icon" href="../img/icons_site.svg#icon-heart_wite"></use>
                    </svg>
                </p>
            </div>
            <div class=".item-news__wrapper-text">
                <h2 class="item-news__title">
                ${title}
                </h2>
                <p class="item-news__description">
                ${description}</p>
            </div>
            <div class="item-news__info">
                <span class="item-news__info-date">
                ${date}
                </span>
                <a class="item-news__info-link" href="${url}#">Read more</a>
            </div>
        </article>
    </li>`
        if (index === 1) {
            return MARKUP + WETHER
        }
        return MARKUP
    }).join('')
    onMarkupCard(arrayCard)
}

function onMarkupCard(cards) {
    ulCardList.innerHTML = "";
    ulCardList.insertAdjacentHTML('beforeend', cards)
  }
