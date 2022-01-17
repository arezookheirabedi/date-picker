const paginate: (
  totalItems: number,
  currentPage: number,
  pageSize: number,
  maxPages: number,
) => any = (totalItems = 0, currentPage = 1, pageSize = 10, maxPages = 10) => {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  let currentpage = currentPage;

  // ensure current page isn't out of range
  if (currentpage < 1) {
    currentpage = 1;
  } else if (currentpage > totalPages) {
    currentpage = totalPages;
  }

  let startPage: number;
  let endPage: number;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentpage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentpage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentpage - maxPagesBeforeCurrentPage;
      endPage = currentpage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentpage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  // return object with all pager properties required by the view
  return {
    totalItems,
    currentpage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
};

export default paginate;
