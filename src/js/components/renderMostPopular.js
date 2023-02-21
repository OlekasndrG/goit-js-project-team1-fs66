import onRenderByOneCategorie from '../common/API' 
import {onRenderOneCard} from './renderOneCard' 
onRanderMostPopular()
async function onRanderMostPopular() {
    const card = await onRenderByOneCategorie.articleSearchMostPopular()
    onRenderOneCard(card)
}