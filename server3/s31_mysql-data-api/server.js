var mysql       =  require( 'mysql2' );
var express     =  require( 'express' );
var cors        =  require( 'cors' )

var app         =  express();

//  app.use( bodyParser.urlencoded( { extended: true } ) );  // use to receive key-value pairs of any type, via POST
//  app.use( bodyParser.json( ) );                           // use to receive JSON data, req.body, via POST

    app.use( cors( { origin: '*' } ) );
// -------------------------------------------------------------------------

var pDB = mysql.createConnection( {
        host     : '45.32.219.12',
        user     : 'nimdas',
        password : 'FormR!1234',
        database : 'iodd'
    } );

var aAPI = `${process.argv[1]}`.match( /^C:/ ) ? '' : '/api1'                           // .(30214.03.1 RAM Set if running in Windows)
//      console.log( `aAPI: ${aAPI}, argv0: '${process.argv[1]}'`);

// -------------------------------------------------------------------------

    app.get( aAPI + '/', function( req, res ) {                                         // .(30214.03.2 RAM Add aAPI )
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

    app.get( aAPI + '/projects', function( req, res ) {                                 // .(30214.03.3)

    var nRecs    = req.query.recs || 999
    var aName    = req.query.name
    var aLetters = req.query.letters || ''

    if (aName == null) {
    var aSQL = `SELECT *
                FROM members_projects_colaboration_view
                WHERE Id <= ${nRecs}
                ORDER BY ProjectName, ProjectStyle `
    } else {
        var aSQL = `SELECT *
                    FROM members
                    WHERE LastName = '${aName}'`
    }
//      pDB.query( `SELECT * FROM projects WHERE Id <= ${nRecs}`, onQuery )
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
            res.send( `{ error: "No projects found" }` );
        }
        res.end();
        };
    } );
// -------------------------------------------------------------------------

    app.get( aAPI + '/members', function( req, res ) {                                  // .(30214.03.4)

    var nRecs = req.query.recs || 999
    var aName = req.query.name
    if (aName == null) {
    var aSQL = `SELECT *
                FROM members_view
                WHERE Id <= ${nRecs}
                ORDER BY LastName, FirstName `
    }
//      pDB.query( `SELECT * FROM members WHERE Id <= ${nRecs}`, onQuery )
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
            res.send( `{ error: "No members found" }` );
        }
        res.end();
        };
    } );
// -------------------------------------------------------------------------

    app.get( aAPI + '/members-projects', function( req, res ) {                         // .(30214.03.5)

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
            res.send( JSON.stringify( results ) );
        } else {
            res.send( `{ error: "No members-projects found" }` );
        }
        res.end();
        };
    } );
// -------------------------------------------------------------------------

    app.get( 'aAPI + /home', function( req, res ) {                                     // .(30214.03.8)

    var nRecs = req.query.recs || 999
    var aName = req.query.name
    if (aName == null) {
    var aSQL = `SELECT strMeetingDate
                FROM meetings
                ORDER BY strMeetingDate DESC
                LIMIT 1`
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

    app.get( aAPI + '/meetings', function( req, res ) {                                 // .(30214.03.9)

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
            res.send( JSON.stringify( results ) );
        } else {
            res.send( `{ error: "No meetings found" }` );
        }
        res.end();
        };
    } );
// -------------------------------------------------------------------------

    var nPort = 3001                                                                    // .(30213.02.3 RAM Set nPort once)

        app.listen( nPort );                                                            // .(30213.02.2 RAM Change real port from 3000 to 3003).(30213.02.4)
    if (aAPI == '') {                                                                   // .(30214.03.11)
        console.log( `\n   Server is running at: http://localhost:${nPort}` )           // .(30213.02.1 Change port from 3000 to 3003).(30213.02.5)
    } else {                                                                            // .(30214.03.12 Beg)
        console.log( `\n   Server is running at: https://IODD.com${aAPI} -> port:${nPort}` )
        }                                                                               // .(30214.03.12 End)
        console.log(   `   Server is running in: ${ process.argv[1] }\n` )              // .(30214.03.10 RAM Display root dir)
// EOF
// EOF