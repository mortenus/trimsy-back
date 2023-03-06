import express from 'express';

interface CustomRequest extends express.Request {
  customQuery?: Record<string, any>;
}

function useGetQuery(req: CustomRequest) {
  const url = require('url');
  const { query } = url.parse(req.url, true);

  return query;
}

export default useGetQuery;
