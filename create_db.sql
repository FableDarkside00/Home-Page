--Create the database
CREATE DATABASE IF NOT EXISTS teste;

--You also can just use your root instead set a new user but following the project is: 
--This set the user who must be specified to db.js module you can change that if you want it 
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';

--This setup the necessary privilleges to the account that was made a command ago, remember if you change the name of the table in any case you may need grant those privilleges again
GRANT SELECT, INSERT, DELETE, CREATE, UPDATE ON teste.* TO 'admin'@'localhost'
