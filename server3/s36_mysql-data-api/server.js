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
		  <a href="/members"                      >/members</a> (not implemented yet)<br>
		  <a href="/members-projects"             >/members-projects</a> (not implemented yet)<br>     
		  <a href="/projects"                     >/projects</a><br> 
		  <a href="/project-colaborators"         >/project-colaborators</a><br> 
		  <a href="/project-colaborators-letters" >/project-colaborators-letters</a><br> 
		</div>       
		`);
	} ) ;
// -------------------------------------------------------------------------

	app.get( '/projects', function( req, res ) {

   var  nRecs    =  req.query.recs    || 9999 
   var  aLetters =  req.query.letters || ''

    if (aLetters == "") {
   var 	aSQL  = `SELECT  * 
                   FROM  projects
                  WHERE  Id <= ${nRecs}`
   } else {
   var  aSQL  = `SELECT  * 
                   FROM  members, members_projects, projects  
                  WHERE  members.Id  = members_projects.MemberId
                    AND  projects.Id = members_projects.ProjectId
                    AND  LastName like '${aLetters}%' 
               ORDER BY  Name, Lastname` 
        }                  

		pDB.query( aSQL, onQuery )
	function onQuery( error, results, fields ) {
		if ( error ) { 
			console.log( `** Error: ${error.message}` );
//	        res.send( `Error: ${error.message}` );
			res.send( JSON.stringify( { projects: { Error: error.message } } ) ); // to conform to db.json structure 
			res.end();
			return
		    }
		if (results.length > 0) {
			res.setHeader( 'Content-Type', 'application/json' );
//			res.send( JSON.stringify(             results   ) );
			res.send( JSON.stringify( { projects: results } ) ); // to conform to db.json structure 
		} else {
//       	res.send( `{ error: "No projects found" }` );
			res.send( JSON.stringify( { projects: { Error: "No projects found" } } ) ); // to conform to db.json structure 
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
			res.send( JSON.stringify( { colaborators: results } ) );
		} else {
			res.send( `{ error: "No projects found" }` );
		}
		res.end();
		};
	} );  // app.get( '/project-colaborators', ... ) 
// -------------------------------------------------------------------------

	app.get( '/project-colaborators-letters', function( req, res ) {

   var  iId  =  req.query.id || 0  
   var 	aSQL = `SELECT  Distinct substr(LastName,1,1) as Letter 
                  FROM  members_projects_view
               ORDER BY 1` 

   var  aTable = "letters"

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
        var pJSON = { } 
            pJSON[ aTable ] = results.map( pLetter => pLetter.Letter )    
//          pJSON = { aTable : results }   // no workie 

  			res.send( JSON.stringify( pJSON ) );
//			res.send( JSON.stringify( { aTable      : results } ) );
//			res.send( JSON.stringify( { Colaborators: results } ) );
		} else {
			res.send( `{ error: "No ${aTable} found!" }` );
		}
		res.end();
        }
	} );  // app.get( '/project-colaborators-letters', ... ) 
// -------------------------------------------------------------------------

	app.listen(3000);
	console.log( "\n  Server is running at: http://localhost:3000" )

// EOF