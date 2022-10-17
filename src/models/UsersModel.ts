export interface IUsersModelData {
  first_name:string;
  last_name:string;
  email:string;
}

export interface IUsersModel{
  create:(request:IUsersModelData)=> Promise<Boolean | void>;
  findEmail: (email: string) => Promise<boolean>
}