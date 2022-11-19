import { Resultado } from '../models/Resultado';
import sorteioRepository from '../repositories/sorteioRepository';

class SorteioService {
  async getSorteios(quantidadeSorteios: number): Promise<Resultado[]> {
    return await sorteioRepository.getSorteios(quantidadeSorteios);
  }
}

export default new SorteioService();
