
import api from '../common/API';
import { findFavoriteCards, findReadCards } from './articles';
import { onRenderOneCard } from './renderOneCard';
import paginator from './pagination.js';
import { findFavoriteCards, findReadCards } from './articles';
onRanderMostPopular();
async function onRanderMostPopular() {
  const result = await api.articleSearchMostPopular();

  const options = {
    perPage: 8,
    items: result.articles,
    onPageChanged: onRenderOneCard,
  };

  paginator.paginate(options);
  findFavoriteCards();
  findReadCards();
}

