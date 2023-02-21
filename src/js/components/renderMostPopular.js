import onRenderByOneCategorie from '../common/API';
import { onRenderOneCard } from './renderOneCard';
import { findFavoriteCards, findReadCards } from './articles';
onRanderMostPopular();

async function onRanderMostPopular() {
  const card = await onRenderByOneCategorie.articleSearchMostPopular();
  onRenderOneCard(card);
  findFavoriteCards();
  findReadCards();
}