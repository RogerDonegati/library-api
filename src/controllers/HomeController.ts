import { Request, Response } from 'express';

class HomeController {
    index(req: Request, res: Response) {
        return res.json({
            'API Status': true,
        });
    }
}

export default new HomeController();
