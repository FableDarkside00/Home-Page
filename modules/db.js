const Sequelize = require("sequelize");

//Sequelize
    //Connection
    const sequelize = new Sequelize('teste', 'admin', 'admin123', {host: "localhost", dialect: 'mysql'});
    
    //Authenticate
    sequelize.authenticate().then(()=>{
        console.log("Conectado com sucesso")}
    ).catch((err)=>{
        console.error(`Falha ao se conectar: ${err}`)
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize : sequelize
}