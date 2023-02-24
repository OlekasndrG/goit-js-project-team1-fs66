
import api from '../common/API';
import { onRenderOneCard } from './renderOneCard';
import paginator from './pagination';

export async function onSearchDataAndCategorie(data) {
    console.log("🚀 ~ data:", data);
    
  const result = await api.articleSearchArchiv(data);
    
  const options = {
    items: result.articles,
    params: { date: data },
    onPageChanged: onRenderOneCard,
  };

  paginator.paginate(options);
}