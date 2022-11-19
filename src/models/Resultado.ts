
export interface Resultado {
    id: string;
    nome: string;
    numero_concurso: number;
    data_concurso: Date;
    acumulou: boolean;
    valor_acumulado: number;
    dezenas: string[];
}
