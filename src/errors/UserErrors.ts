import { CustomError } from './CustomError';

export class ErrorObjInvalid extends CustomError {
  constructor(){
    super(406,'Verifique os campos, Nome, Sobrenome ou E-mail, informações faltantes.');
  }
}
export class ErrorInvalidEmail extends CustomError {
  constructor(public email: string){
    super(406,`Verifique o campo E-mail, este e-mail: ${email} está incorreto, exemplo: nome@servidor.com.br`);
  }
}

export class ErrorExistEmail extends CustomError {
  constructor(public email: string){
    super(409,`Este e-mail já está cadastrado. continue com sua compra`);
  }
}