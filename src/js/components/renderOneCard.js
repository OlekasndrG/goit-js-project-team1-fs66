const ulCardList = document.querySelector('.list-news')


export function onRenderOneCard(arrayNews) {

    const arrayCard = arrayNews.map(news => {

        const {media, section,title,abstract,published_date, url} = news;
        let mediaUrl = ''
        
        if (media.length === 0) {
            mediaUrl = 'https://static01.nyt.com/images/2023/02/17/opinion/16PAUL_4/16PAUL_4-thumbStandard.jpg'
        }else{
            const mediaData = media[0]
            mediaUrl = mediaData['media-metadata'][2].url

 
        }
        return `        <li class="list-news__item">
        <article class="item-news__article">
            <div class="item-news__wrapper-img">
                <img class="item-news__img" src="${mediaUrl}" alt="">
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
                ${abstract}</p>
            </div>
            <div class="item-news__info">
                <span class="item-news__info-date">
                ${published_date}
                </span>
                <a class="item-news__info-link" href="${url}#">Read more</a>
            </div>
        </article>
    </li>`}).join('')
    onMarkupCard(arrayCard)
}

function onMarkupCard(cards) {
    ulCardList.insertAdjacentHTML('beforeend', cards)
  
  }

