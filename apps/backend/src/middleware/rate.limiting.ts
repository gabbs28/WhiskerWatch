import rateLimit from 'express-rate-limit';

export default rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
});
