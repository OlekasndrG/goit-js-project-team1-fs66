import api from '../common/API.js';


export default class PaginationSearchHandler {
  cache = {};

  async onPageChanged(paginator) {
    // This API always returns 10 items, but we have to show either 8 or 4, so in some situations we will have to make 2 api calls
    const startIndex = paginator.itemsPerPage * (paginator.currentPage - 1);
    const endIndex = startIndex + paginator.itemsPerPage;
    const result = await this.getPaginatedSearchResults(paginator.api.params, startIndex, endIndex);
    paginator.totalPages = Math.ceil(result.total / paginator.itemsPerPage);
    return result.articles;
  };

  async getPaginatedSearchResults(apiParams, startIndex, endIndex) {
    const apiLimit = 10;
    // Determine API pages to what our indexes belong.
    const p1 = Math.trunc(startIndex / apiLimit);
    const p2 = Math.trunc(endIndex / apiLimit);
    let result;
    if (p1 === p2) {
      // All articles can be fetched from a single API page
      result = await this.getCachedOrFetch(apiParams, p1);
      // determine slice
      const start = startIndex - (p1 * 10);
      const end = endIndex - (p1 * 10);
      return { 'articles': result.articles.slice(start, end), 'total': result.total };
    } else {
      // Here we have to make two calls and then construct resulting array using parts of two responses
      const res = [];

      const start = startIndex - (p1 * 10);
      result = await this.getCachedOrFetch(apiParams, p1);
      result.articles.slice(start, 10).forEach((val) => res.push(val));

      const end = endIndex - (p2 * 10);
      result = await this.getCachedOrFetch(apiParams, p2);
      result.articles.slice(0, end).forEach((val) => res.push(val));

      return { 'articles': res, 'total': result.total };
    }
  }

  async getCachedOrFetch(apiParams, page) {
    let result = this.cache[page];
    if (!result) {
      result = await api.articleSearchByQuery({ ...apiParams, ...{ page: page } });
      this.cache[page] = result;
    }
    return result;
  }

}