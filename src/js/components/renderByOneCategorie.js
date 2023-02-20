import API from '../common/API'


const fethByCategorie = new API;

export async function onRenderByOneCategorie(params) {
    const dataCurrent = localStorage.getItem('Date_current')
    if(dataCurrent){
    const result = await fethByCategorie.articleSearchByCategory(category, dataCurrent)

    }
    console.log(result);
    
}


