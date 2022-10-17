import { CustomError } from './CustomError';

export class ErrorObjInvalid extends CustomError {
  constructor(){
    super(406,'Verifique os campos, Quantidade e data de entrega, informações faltantes.');
  }
}

export class ErrorQtyStock extends CustomError {
  constructor(public productName: string){
    super(406,`Não temos a quantidade do produto ${productName} em estoque.`);
  }
}
export class ErrorEmailNotFound extends CustomError {
  constructor(public email: string){
    super(404,`Para concluir a compra, cadastre um e-mail, exemplo: nome@servidor.com.br`);
  }
}