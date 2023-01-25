const sql = require('mssql');
const config = { 
        user: 'sco', 
        password: 'Azn.ani000', 
        server: 'localhost', 
        database: 'io',
};
let members = [];
let lastname = '%t%';

async function queryDb(queryParm) {
        let pool = await sql.connect(config);
        let data = await pool.request()
            .input('lastname', sql.VarChar, queryParm)
            .query("Select FirstName,LastName from Members where LastName like @lastname");           // Store each record in an array
        for (let i = 0; i < data.rowsAffected; i++)
        {
                members.push(data.recordset[i]);
        }
    pool.close;
    sql.close;
    return members;
}

// async function invocation
queryDb(lastname)
 .then(result=>{result.forEach(item=>{
            console.log(item);
        });})
 .catch(err=>{
    // pool.close;
    // sql.close;
     console.log(err)
 })