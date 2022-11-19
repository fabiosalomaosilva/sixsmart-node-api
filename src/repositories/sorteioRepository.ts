import { SorteioModel } from '../data/sorteioSchema';
import { Resultado } from '../models/Resultado';
import { Sorteio } from '../models/sorteio';

class SorteioRepository {
  async getLastSorteio(): Promise<Sorteio> {
    const obj = await SorteioModel.find()
      .sort({ numero_concurso: -1 })
      .limit(1);
    return obj[0];
  }

  async getSorteios(quantidadeSorteios: number): Promise<Resultado[]> {
    await this.removeDuplicados();
    const lista = await SorteioModel.find()
      .sort({ numero_concurso: -1 })
      .limit(quantidadeSorteios);
    return lista;
  }

  async addSorteio(sorteio: Sorteio): Promise<Sorteio> {
    const obj = await SorteioModel.create(sorteio);
    return obj;
  }

  async editSorteio(sorteio: Sorteio): Promise<Sorteio | null> {
    const obj = await SorteioModel.findByIdAndUpdate(
      { _id: sorteio.id },
      sorteio,
    );
    return obj;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async removeSorteio(id: any) {
    try {
      await SorteioModel.deleteOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  async removeDuplicados() {
    const dados = await SorteioModel.aggregate([
      {
        $group: {
          _id: { numero_concurso: '$numero_concurso' },
          idsUnicos: { $addToSet: '$_id' },
          total: { $sum: 1 },
        },
      },
      {
        $match: {
          total: { $gt: 1 },
        },
      },
    ]);

    dados.forEach((item) => {
      const id = item.idsUnicos[1];
      this.removeSorteio(id);
    });
  }
}

export default new SorteioRepository();
