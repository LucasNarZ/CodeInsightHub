import Pessoa from "@models/Pessoas";
import Admin from "@models/Admin";

(async () => {
    await Pessoa.sync({force: true});
    await Admin.sync({force: true});
})()