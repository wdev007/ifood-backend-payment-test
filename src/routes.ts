import { Router } from 'express'; 

const routes = Router();

routes.get('/users', (req, res) => {
  res.json({ ok: true });
});



export default routes;