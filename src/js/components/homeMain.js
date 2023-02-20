import { async } from "@firebase/util";
import { fetchCategoriess } from "./fetchTest"
import { onRenderOneCard } from "./renderOneCard"

onHomeMain()
async function onHomeMain() {
    const ArrayCardNews = await fetchCategoriess()
    onRenderOneCard(ArrayCardNews)

}