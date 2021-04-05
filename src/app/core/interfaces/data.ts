export interface Modal {
    activateModal: boolean;
    activateInput: boolean;
    textsForm?: any;
    dataForm?: any;
}

export interface Employee {
    idEmployeed: string;
    fullname: string;
    occupation: string;
    idBoss: string;
    id?: string;
}