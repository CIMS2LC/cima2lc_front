import { Request, Response } from 'express';

function getillCase(req: Request, res: Response, u: string) {
  const result = {
    code: 200,
    data: { name: 123 },
  };
  return res.json(result);
}

export default {
  'GET /api/illCase/allinfo/find': { code: 200, data: { name: 123 } },
};
