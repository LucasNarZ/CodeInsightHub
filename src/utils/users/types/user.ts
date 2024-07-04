interface User {
    id?:string;
    apelido:string;
    nome:string;
    nascimento:string;
    stack?:string[];
    searchVector?:string;
}

export default User;