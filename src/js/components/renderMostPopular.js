
import api from '../common/API';
import { onRenderOneCard } from './renderOneCard';
import paginator from './pagination.js';

onRanderMostPopular();
async function onRanderMostPopular() {
  const result = await api.articleSearchMostPopular();

  const options = {
    items: result.articles,
    onPageChanged: onRenderOneCard,
  };

  paginator.paginate(options);
}

