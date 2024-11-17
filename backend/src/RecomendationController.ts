import { Request, Response } from "express";

class RecomendationController {

  public recomendations (req: Request, res: Response) {
    return res.json({ response: 'Hello World' });
  }
}

export const recomendationController = new RecomendationController();