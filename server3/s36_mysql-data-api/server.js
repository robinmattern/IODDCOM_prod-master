var mysql 		=  require( 'mysql2' );
var express 	=  require( 'express' );
var cors        =  require( 'cors' )

var app         =  express();

//	app.use( bodyParser.urlencoded( { extended: true } ) );  // use to receive key-value pairs of any type, via POST
//	app.use( bodyParser.json( ) );                           // use to receive JSON data, req.body, via POST

	app.use( cors( { origin: '*' } ) );
// -------------------------------------------------------------------------

var pDB = mysql.createConnection( {
		host     : 'localhost',
		user     : 'root',
		password : 'FormR!1234',
		database : 'iodd'
	} );
// -------------------------------------------------------------------------

	app.get( '/', function( req, res ) {
		res.send(`
		Welcome to IODD MySQL Express Server API.<br>
		Use any of the following APIs:<br>
		<div style="margin-left:20px">
		  <a href="/members"         >/members</a> (not implemented yet)<br>
		  <a href="/members-projects">/members-projects</a> (not implemented yet)<br>     
		  <a href="/projects"        >/projects</a><br> 
		</div>       
		`);
	} ) ;
// -------------------------------------------------------------------------

	app.get( '/projects', function( req, res ) {
	var nRecs = req.query.recs || 99  
		pDB.query( `SELECT * FROM projects WHERE Id <= ${nRecs}`, onQuery )
	function onQuery( error, results, fields ) {
		if ( error ) { 
			console.log( `** Error: ${error.message}` );
			res.send( `Error: ${error.message}` );
			res.end();
			return
		    }
		if (results.length > 0) {
			res.setHeader( 'Content-Type', 'application/json' );
			res.send( JSON.stringify( results ) );
		} else {
			res.send( `{ error: "No projects found" }` );
		}
		res.end();
		};
	} );
// -------------------------------------------------------------------------

	app.listen(3000);
	console.log( "\n  Server is running at: http://localhost:3000" )

// EOF