export interface EnterpriseModel{
    idEmpresa: number;
    nit: string;
    nombre: string;
    celular: string;
    correo: string;
    licencia: string;
    fechaVencimiento: string;
}

export interface CreateEnterpriseModel extends Omit<EnterpriseModel,'idEmpresa'>{
    clave: string
}