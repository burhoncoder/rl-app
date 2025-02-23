export const createPaginatedResult = ({ items, limit, page, totalItems }) => {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    meta: {
      currentPage: page,
      pageSize: limit,
      nextPage: totalPages > page ? page + 1 : page,
      prevPage: page > 1 ? page - 1 : page,
      totalPages,
    },
  };
};
