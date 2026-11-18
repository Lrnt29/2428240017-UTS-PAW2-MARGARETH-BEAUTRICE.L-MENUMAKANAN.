import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'REST API Manajemen Menu Makanan - UTS PAW II (NPM 2428240017)',
    endpoints: {
      create: 'POST /api/menumakanan',
      list: 'GET /api/menumakanan?name=&description=&price=&price_min=&price_max=&is_available=&q=&sort=&page=&limit=',
      detail: 'GET /api/menumakanan/:id',
      update: 'PUT /api/menumakanan/:id',
      remove: 'DELETE /api/menumakanan/:id',
    },
  });
});

export default router;
