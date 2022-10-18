import { Sorteio } from '../models/sorteio';
import sorteioRepository from '../repositories/sorteioRepository';

class SorteioService {
  async getSorteios(quantidadeSorteios: number): Promise<Sorteio[]> {
    return await sorteioRepository.getSorteios(quantidadeSorteios);
  }
}

export default new SorteioService();
