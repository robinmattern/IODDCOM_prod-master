var mysql 		=  require( 'mysql2' );
var express 	=  require( 'express' );
var cors        =  require( 'cors' )

var app         =  express();

//	app.use( bodyParser.urlencoded( { extended: true } ) );  // use to receive key-value pairs of any type, via POST
//	app.use( bodyParser.json( ) );                           // use to receive JSON data, req.body, via POST

	app.use( cors( { origin: '*' } ) );
// -------------------------------------------------------------------------

var pDB = mysql.createConnection( {
		host     : '45.32.219.12',
		user     : 'nimdas',
		password : 'FormR!1234',
		database : 'iodd'
	} );
// -------------------------------------------------------------------------

	app.get( '/', function( req, res ) {
		res.send(`
		Welcome to IODD MySQL Express Server API.<br>
		Use any of the following APIs:<br>
		<div style="margin-left:20px">
		  <a href="/home"                         >/home</a><br>                         <!-- .(20308.01.1 JRS Added) -->
		  <a href="/members"                      >/members</a><br>
		  <a href="/members-projects"             >/members-projects</a><br>     
		  <a href="/projects"                     >/projects</a><br> 
		  <a href="/projects?letters=a"           >/projects?letters=a</a><br>            <!-- .(20307.02.1 RAM Added) -->
		  <a href="/project-colaborators"         >/project-colaborators</a><br>          <!-- .(20307.02.2) -->
		  <a href="/project-colaborators-letters" >/project-colaborators-letters</a><br>  <!-- .(20307.02.3) -->
		</div>       
		`);
	} ) ;
// -------------------------------------------------------------------------

	app.get( '/projects', function( req, res ) {

	var nRecs    = req.query.recs || 999 
//  var aName    = req.query.name
    var aLetters = req.query.letters || '' 

/*	if (aName == null) {
	var aSQL = `SELECT * 
				FROM members_projects_colaboration_view
				WHERE Id <= ${nRecs}
				ORDER BY ProjectName, ProjectStyle `
*/                
  	if (aLetters == '') {
	var aSQL = `SELECT * 
				  FROM projects, members_projects
                 WHERE projects.Id = members_projects.ProjectId
			 	   AND projects.Id <= ${nRecs}
	 		  ORDER BY Name, ProjectStyle `
	} else {
   var  aSQL  = `SELECT  * 
                   FROM  members, members_projects, projects  
                  WHERE  members.Id  = members_projects.MemberId
                    AND  projects.Id = members_projects.ProjectId
                    AND  LastName like '${aLetters}%' 
               ORDER BY  Name, Lastname` 
	}
//		pDB.query( `SELECT * FROM projects WHERE Id <= ${nRecs}`, onQuery )
		pDB.query(aSQL, onQuery)
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
			res.send( JSON.stringify( { projects: results } ) );  // .(30208.01.1 RAM Add top table object)
		} else {
			console.log( `** Error: "No Projects Found"` );
			res.send( `{ projects: { Error: "No projects found" } }` );
		}
		res.end();
		};
	} );
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

app.get( '/members', function( req, res ) {

	var nRecs = req.query.recs || 999 
	var aName = req.query.name
	if (aName == null) {
	var aSQL = `SELECT * 
				FROM members_view
				WHERE Id <= ${nRecs}
				ORDER BY LastName, FirstName `
	}
//		pDB.query( `SELECT * FROM members WHERE Id <= ${nRecs}`, onQuery )
		pDB.query(aSQL, onQuery)
	function onQuery( error, results, fields ) {
		if ( error ) { 
			console.log( `** Error: ${error.message}` );
			res.send( `Error: ${error.message}` );
			res.end();
			return
		    }
		if (results.length > 0) {
			res.setHeader( 'Content-Type', 'application/json' );
			res.send( JSON.stringify( { members: results } ) );   // .(30208.01.2 RAM Add top table object)
		} else {
			res.send( `{ error: "No members found" }` );
		}
		res.end();
		};
	} );
// -------------------------------------------------------------------------

app.get( '/members-projects', function( req, res ) {

	var nRecs = req.query.recs || 999 
	var aName = req.query.name
	if (aName == null) {
	var aSQL = `SELECT * 
				FROM members_projects_view
				WHERE Id <= ${nRecs}
				ORDER BY LastName, FirstName, Sort `
	}
		pDB.query(aSQL, onQuery)
	function onQuery( error, results, fields ) {
		if ( error ) { 
			console.log( `** Error: ${error.message}` );
			res.send( `Error: ${error.message}` );
			res.end();
			return
		    }
		if (results.length > 0) {
			res.setHeader( 'Content-Type', 'application/json' );
			res.send( JSON.stringify( { "member-projects": results } ) );   // .(30208.01.3 RAM Add top table object)
		} else {
			res.send( `{ error: "No members-projects found" }` );
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

   var  aTable = "letters"        // .(30208.01.3 RAM Make top table object lower case)

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
//			res.send( JSON.stringify( { colaborators: results } ) );
		} else {
			res.send( `{ error: "No ${aTable} found!" }` );
		}
		res.end();
        }
	} );  // app.get( '/project-colaborators-letters', ... ) 

// -------------------------------------------------------------------------
app.get( '/home', function( req, res ) {

	var nRecs = req.query.recs || 999 
	var aName = req.query.name

	if (aName == null) {
    var aSQL  = `SELECT *     
			   	 FROM meetings
			 	 ORDER BY MeetingDateTime DESC `   // .(20307.01.1 RJS Was strMeetingTime) 
			  + `LIMIT 1`
	    }
		pDB.query(aSQL, onQuery)
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
			res.send( `{ error: "No strMeetingDate found" }` );
		}
		res.end();
		};
	} );
// -------------------------------------------------------------------------

app.get( '/meetings', function( req, res ) {

	var nRecs = req.query.recs || 999 
	var aName = req.query.name
	if (aName == null) {
	var aSQL = `SELECT * 
				FROM meetings
				ORDER BY MeetingDateTime DESC`
	}
		pDB.query(aSQL, onQuery)
	function onQuery( error, results, fields ) {
		if ( error ) { 
			console.log( `** Error: ${error.message}` );
			res.send( `Error: ${error.message}` );
			res.end();
			return
		    }
		if (results.length > 0) {
			res.setHeader( 'Content-Type', 'application/json' );
			res.send( JSON.stringify( { meetings: results } ) );  // .(30208.01.4RAM  Add top table object)
		} else {
			res.send( `{ error: "No meetings found" }` );
		}
		res.end();
		};
	} );
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

	app.listen(3003);
	console.log( "\n   Server is running at: http://localhost:3003" )

// EOF
// EOF