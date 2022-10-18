import { Request, Response } from 'express';

import sorteioService from '../services/sorteioService';

class SorteiosController {
  async get(req: Request, res: Response) {
    const quantidade: number = parseInt(req.params.quantidade);
    const lista = await sorteioService.getSorteios(quantidade);
    if (lista && lista.length > 0) {
      return res.status(200).json(lista);
    } else {
      return res.status(500).json({
        message: 'A busca não trouxe resultados.',
      });
    }
  }
}

export default new SorteiosController();
