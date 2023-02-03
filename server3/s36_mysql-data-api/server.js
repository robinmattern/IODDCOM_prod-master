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
		  <a href="/members"                >/members</a> (not implemented yet)<br>
		  <a href="/members-projects"       >/members-projects</a> (not implemented yet)<br>     
		  <a href="/projects"               >/projects</a><br> 
		  <a href="//project-colaborators"  >/project-colaborators</a><br> 
		</div>       
		`);
	} ) ;
// -------------------------------------------------------------------------

	app.get( '/projects', function( req, res ) {

	var nRecs =  req.query.recs || 9999  
   var 	aSQL  = `SELECT  * 
                   FROM  projects
                  WHERE  Id <= ${nRecs}`

		pDB.query( aSQL, onQuery )
	function onQuery( error, results, fields ) {
		if ( error ) { 
			console.log( `** Error: ${error.message}` );
			res.send( `Error: ${error.message}` );
			res.end();
			return
		    }
		if (results.length > 0) {
			res.setHeader( 'Content-Type', 'application/json' );
//			res.send( JSON.stringify(             results   ) );
			res.send( JSON.stringify( { Projects: results } ) ); // to conform to db.json structure 
		} else {
			res.send( `{ error: "No projects found" }` );
		}
		res.end();
		};
	} );
// -------------------------------------------------------------------------

	app.get( '/project-colaborators', function( req, res ) {

   var  iId  =  req.query.id || 0  
   var 	aSQL = `SELECT  Distinct * 
                  FROM  members_projects_view ${ iId ? 
                `WHERE  ProjectId = ${iId}` : `` }`

		pDB.query( aSQL, onQuery )
	function onQuery( error, results, fields ) {
		if ( error ) { 
			console.log( `** Error: ${error.message}` );
			res.send( `Error: ${error.message}` );
			res.end();
			return
		    }
		if (results.length > 0) {
			res.setHeader( 'Content-Type', 'application/json' );
			res.send( JSON.stringify( { Colaborators: results } ) );
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