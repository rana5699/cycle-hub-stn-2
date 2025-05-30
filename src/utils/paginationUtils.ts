// paginationUtils.ts
type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const getPagination = (meta: Meta) => {
  const { page, totalPages } = meta;

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const nextPage = hasNextPage ? page + 1 : null;
  const previousPage = hasPreviousPage ? page - 1 : null;

  // You can generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return {
    currentPage: page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    pages,
  };
};
