import mysql from "mysql2/promise";


//connect to  mysql database
export async function query({query, values =[] }) {

const dbconnection = await mysql.createConnection({

    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    connectTimeout: 60000, // 1 minute timeout
    

});


try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
} catch (error) {
    throw Error(error.message);
    return {error};
}

}
 