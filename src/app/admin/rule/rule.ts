export interface Word {
    word: string;
    synon: string[];
    value: number;
    weigth: number;
}

export interface Stats {
    totalTrainLines: number; 
    words: Word[];
}
export class Rule {
    id?: any;
    codRule?: string;
    category?: string;
    name?: string;
    status?: string;
    stats?: Stats[];
}