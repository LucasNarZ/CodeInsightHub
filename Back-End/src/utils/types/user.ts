interface User {
    id?:string;
    apelido:string;
    nome:string;
    nascimento:string;
    stack?:string[];
    searchVector?:string;
    [key:string]:string | string[];
}

export default User;