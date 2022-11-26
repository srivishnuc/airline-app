import { rest } from 'msw';
rest.post('/login', (req, res, ctx) => {
 return res(ctx.json('John Smith'), ctx.delay(150));
}),
 // Handles a GET /user request
 rest.get('/user', (req, res, ctx) => {});
