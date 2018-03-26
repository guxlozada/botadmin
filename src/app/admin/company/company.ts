export interface Company {
    id?: string;
    name?: string;
    company?: string;
    url?: string;
    status?: string;
    contact?: Contact;
    nlpValues?: NLPValues;
}

export interface Contact {
    name?:string;
    mail?:string;
    mailAlt?:string;
    phone?:string;
    address?:string;
}

export interface NLPValues {
    totalRules?: number;
    activeRules?: number;
    trainningSet?: number;
    accuracyLimit?: number;
    confidenceLimit?: number; 
}