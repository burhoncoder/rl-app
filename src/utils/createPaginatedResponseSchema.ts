export const createPaginatedResponseSchema = (itemSchema: string) => ({
  type: 'object',
  properties: {
    statusCode: { type: 'integer', example: 200 },
    data: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: itemSchema },
        },
        meta: {
          type: 'object',
          properties: {
            currentPage: { type: 'integer' },
            pageSize: { type: 'integer' },
            nextPage: { type: 'integer' },
            prevPage: { type: 'integer' },
            totalPages: { type: 'integer' },
          },
        },
      },
    },
  },
});
