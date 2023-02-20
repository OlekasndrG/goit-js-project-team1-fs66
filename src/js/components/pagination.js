class Paginator {
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;
  delta = 1;

  ellipsisTemplate = `<li class='pg-item'><a class='pg-link'>...</a></li>`;

  constructor(selector) {
    this.rootEl = document.querySelector(selector);
    this.pagesEl = this.rootEl.querySelector('.pages');
    this.btnPrevPg = this.rootEl.querySelector('.prev-page');
    this.btnNextPg = this.rootEl.querySelector('.next-page');
    this.addEventListeners();
  }

  addEventListeners() {
    this.rootEl.addEventListener('click', e => {
      const el = e.target;
      if (el.classList.contains('next-page')) {
        this.setPage(this.currentPage + 1);
      } else if (el.classList.contains('prev-page')) {
        this.setPage(this.currentPage - 1);
      } else if (el.classList.contains('pg-link')) {
        const page = parseInt(el.dataset.page, 10);
        this.setPage(page);
      }
    });
  }

  init(perPage, totalItems) {
    this.itemsPerPage = perPage;
    this.totalPages = Math.ceil(totalItems / perPage);
    if (this.totalPages > 1) {
      this.setPage(1);
    } else {
      this.rootEl.style.display = 'none';
    }
  }

  setPage(page) {
    if (page > this.totalPages) {
      page = this.totalPages;
    } else if (page < 1) {
      page = 1;
    }
    this.currentPage = page;
    this.render();
    this.dispatch();
  }

  onPageChange(callback) {
    this.rootEl.addEventListener('pageChanged', callback);
  }

  dispatch() {
    const event = new Event('pageChanged');
    this.rootEl.dispatchEvent(event);
  }

  getPageHtml(page, isActive) {
    return `<li class='pg-item${
      isActive ? ' active' : ''
    }'><a class='pg-link' href='#' data-page='${page}'>${page}</a></li>`;
  }

  render() {
    console.log(this.currentPage, this.totalPages);
    const range = this.delta + 4;
    let truncated = 0;
    const truncatedLeft = this.currentPage - this.delta;
    const truncatedRight = this.currentPage + this.delta;
    let html = '';
    let htmlWithEllipsis = '';
    for (let i = 1; i <= this.totalPages; i++) {
      const isActive = i === this.currentPage;
      if (this.totalPages >= 2 * range - 1) {
        if (truncatedLeft > 3 && truncatedRight < this.totalPages - 3 + 1) {
          if (i >= truncatedLeft && i <= truncatedRight) {
            htmlWithEllipsis += this.getPageHtml(i, isActive);
          }
        } else {
          if (
            (this.currentPage < range && i <= range) ||
            (this.currentPage > this.totalPages - range &&
              i >= this.totalPages - range + 1) ||
            i === this.totalPages ||
            i === 1
          ) {
            html += this.getPageHtml(i, isActive);
          } else {
            truncated++;
            if (truncated === 1) {
              html += this.ellipsisTemplate;
            }
          }
        }
      } else {
        html += this.getPageHtml(i, isActive);
      }
    }
    if (htmlWithEllipsis) {
      this.pagesEl.innerHTML =
        this.getPageHtml(1) +
        this.ellipsisTemplate +
        htmlWithEllipsis +
        this.ellipsisTemplate +
        this.getPageHtml(this.totalPages);
      this.rootEl.style.display = 'block';
    } else if (html) {
      this.pagesEl.innerHTML = html;
      this.rootEl.style.display = 'block';
    } else {
      this.rootEl.style.display = 'none';
    }
  }
}

const paginator = new Paginator('.pagination');


