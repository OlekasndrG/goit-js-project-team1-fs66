import API from '../common/API'


const fethByCategorie = new API;

export async function onRenderByOneCategorie(params) {
    const dataCurrent = localStorage.getItem('Date_current')
    if(dataCurrent){
    const result = await fethByCategorie.articleSearchByCategory(category, dataCurrent)

    }
    console.log(result);
    
}


// async articleSearchByCategory({ category, date = null, limit, offset }) {
//     const response = await axios(
//       `https://api.nytimes.com/svc/news/v3/content/all/${category}.json`,
//       { params: { 'api-key': V3_API_KEY, limit: limit, offset: offset } },
//     );

//     const articles = response.data.results.map(result => {
//       return {
//         title: result.title,
//         image: result.multimedia[2].url,
//         description: result.abstract,
//         date: new Date(result.published_date),
//         url: result.url,
//       };
//     });
