/*\
##=========+====================+================================================+
##RD        IODD_Server.mjs     | IODD Server script
##RFILE    +====================+=======+===============+======+=================+
##FD      IODD_Server_u1.02.mjs |   2925|  3/12/23 12:08|    65| u2.05-30312.1200
##FD      IODD-Server_u1.03.mjs |  16788|  3/31/23 22:46|   378| u1-03-30331.2246
##FD      IODD-Server_u1.05.mjs |  24655|  4/03/23 21:00|   510| u1-05.30403.2100
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This Javascript file modifies the Login Button
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2023 8020Data-formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           IODD                | Main Class of Express routes
#             getTable          |
#             Root_getRoute     |
#             Login_getRoute    |
#             Login_getRoute    |
#             Meetings_getRoute |
#             Members_getRoute  |
#             MembersBios_getRoute     |
#             MembersProjects_getRoute |
#             Projects_getRoute |
#             User_getRoute     |
#             Users_getRoute    |
#             ProjectCollaborators_getRoute |
#             init              |
#             start             |
#          onRoute              |
#    //    onGetRoute           |                                                   //#.(30327.01.1 RAM)
##CHGS     .--------------------+----------------------------------------------+
# .(30221.01  2/21/23 RAM  3:44p| Created
# .(30310.01  3/10/23 RAM  1:00p|
# .(30320.01  3/20/23 RAM 11:56a|
# .(30320.01  3/20/23 RAM 12:33p|
# .(30322.01  3/22/23 RAM 10:56a|
# .(30323.01  3/23/23 RAM 10:21a|
# .(30327.01  3/27/23 RAM 11:00a|
# .(30328.03  3/28/23 RAM  9:18p| Move setRoute to server-fns.mjs
# .(30331.01  3/31/23 RAM  8:09p| Display onRoute name
# .(30402.04  4/02/23 RAM  4:37p| Add getStyles to this.getLogin
# .(30403.01  4/03/23 RAM  7:30a| Use shared function fmtHTML
# .(30403.02  4/03/23 RAM  8:52a| Add Login_postRoute
# .(30403.04  4/03/23 RAM  3:10p| Add sndFile
# .(30403.05  4/03/23 RAM  7:36p| Add putData
# .(30403.06  4/03/23 RAM  8:46p| Add chkSQL

##PRGM     +====================+===============================================+
##ID                            |
##SRCE     +====================+===============================================+
#*/
//  --------------------------  =   -------------------------------- ------------------ ------------------+ --------------------------

    import  express from  'express';

    import { chkArgs, sndHTML, getData, sndRecs, sndFile } from './assets/mjs/server-fns_u1.05.mjs';   // .(30403.04.3 RAM Add sndFile)
    import { init, start, setRoute, sayMsg, sndError     } from './assets/mjs/server-fns_u1.05.mjs';   // .(30327.01.1 RAM)
    import { getHTML, getStyles, getJSON,  indexObj      } from './assets/mjs/server-fns_u1.05.mjs';   // .(30402.02.4 RAM).(30402.04.5)
    import { putData, chkSQL                             } from './assets/mjs/server-fns_u1.05.mjs';   // .(30403.05.3 RAM Add putData).(30403.06.5 RAM Add chkSQL)

//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

        if (process.argv[1].replace( /.*[\\/]/, '' ).match( /IODD.*\.mjs/ )) {

       var  pApp      =  express()
       var  bQuiet // =  true        // Override .env Quiet = {true|false}
       var  nPort  // =  54131       // Override .env Server_Port

       var  pIODD     =  new IODD
            pIODD.init(  pApp, bQuiet )

            pIODD.Root_getRoute( "/" )
//          pIODD.Table_getRoute()
            pIODD.Login_getRoute( )
            pIODD.Login_postRoute( )    // .(30403.02.1)
            pIODD.Members_getRoute( )
            pIODD.MembersBios_getRoute( )
            pIODD.Projects_getRoute( )
            pIODD.ProjectCollaborators_getRoute( )
            pIODD.MembersProjects_getRoute( )
//          pIODD.ProjectCollaboratorsLetters_getRoute( '/letters' )
            pIODD.Meetings_getRoute( )
            pIODD.Users_getOneRoute( )
            pIODD.Users_getAllRoute( )

            pIODD.start( nPort ) //
            }
//--------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  IODD ( ) {

       var  pApp, pDB, aAPI_Host          // Doesn't work for bQuiet, because it is not used in this module

       var  pDB_Config= { }

//--------  ------------------  =   -------------------------------- ------------------

this.Table_getRoute = function( aGetRoute, pValidArgs ) {

       var  aMethod   = 'get'
       var  aRoute    = '/table'

            aGetRoute =  aGetRoute  ? aGetRoute  : aRoute
            pValidArgs=  pValidArgs ? pValidArgs :
                          {  id:      /[0-9]+/
                          ,  letters: /([a-z],)*[a-z]/
                             }
//          ---------------------------------------------------

            setRoute( pApp, aMethod, aGetRoute, JSON_getRouteHandler, pValidArgs, fmtSQL )

//          ---------------------------------------------------

  function  fmtSQL( pArgs ) {
       var  nRecs     =  pArgs.recs || 999
       var  aLetters  =  pArgs.letters

        if (aLetters) {  // --------------------------------
       var  aSQL      = `
          SELECT  *
            FROM  table
           WHERE  substring( Name, 1, 1) in ( '${ aLetters.replace( /,/, "','" ) }' )
        ORDER BY  Name `
        } else {
       var  aSQL      = `
          SELECT (@nRow:=@nRow + 1) AS RNo, countries_view.*
            FROM  table
               , (SELECT @nRow:=0) AS T
           WHERE  @nRow <= ${nRecs}
        ORDER BY  Id `
        }
    return  aSQL
        };
//     ---  ---------------------------------------------------
   }
//---- -------------------------------------------------------------------

//------------------------------------------------------------------------------

this.Root_getRoute  = function( aRoute_,  pValidArgs ) {

       var  aMethod             =  'get'
       var  aRoute              =  '/'

            aRoute              =   aRoute_    ? aRoute_ : aRoute
            pValidArgs          =   pValidArgs ? pValidArgs : { }
//          ------------------  =   --------------------------------

       pApp.get( `${aAPI_Host}${aRoute}`, Root_getRouteHandler )
            sayMsg(  aMethod,   aRoute )
//          ------------------  =   --------------------------------

//function  Root_routeHandler( aMethod, pReq, pRes, aRoute, pValidArgs ) { .. }
  function  Root_getRouteHandler( pReq, pRes ) {

                         sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  aHTML     =  fmtHTML( pArgs.name || '' )
                         sndHTML( pRes, aHTML, `${aRoute}${pReq.args}`, "Root_getRouteHandler" )                      // .(30331.01.1)
            }
//          ------------------  =   --------------------------------

  function  fmtHTML( aName ) {
       var  aHTML = `
            Welcome ${aName} to IODD MySQL Express Server API.<br>
            Use any of the following APIs:<br><br>
            <div style="margin-left:40px; font-size:18px; line-height: 25px;">
            <a href="/login?id=90"                    >/login?id=90</a><br>
            <a href="/login?username=a.b@c&password=" >/login form</a><br>
            <a href="/meetings"                       >/meetings</a><br>
            <a href="/members"                        >/members</a><br>
            <a href="/members_bios"                   >/members_bios</a><br>
            <a href="/members_projects"               >/members_projects</a><br>
            <a href="/projects"                       >/projects</a><br>
            <a href="/project_collaborators"          >/project_collaborators</a><br>
            <a href="/users"                          >/users</a><br>                                       <!-- .(30328.03.1 Add Users) -->
            <a href="/user?id=7"                      >/user?id=7</a><br>
            </div> `;
    return  aHTML
            }; // eof fmtRoot
//     ---  ------------------  =   --------------------------------
         }; // eof Root_getRoute
//--------  ------------------  =   -------------------------------- -----

// BEGINNING OF FETCHES (= MENU NAME)

//=login==================================================================
//-(Login)----------------------------------------------------------------

  this.Login_getRoute  = function( ) {

       var  pValidArgs ={ id : /[0-9]+/ }

            setRoute( pApp, 'get', '/login', Login_getRouteHandler )

 async function  Login_getRouteHandler( aMethod, pReq, pRes, aRoute ) {

                         sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =  chkArgs( pReq, pRes,  pValidArgs   ); if (!pArgs) { return }
        if (pArgs.id > 0) {
       var  aSQL      =  await fmtSQL(  pArgs )
       var  mRecs     =  await getData( pDB,   aSQL, aRoute ); if (mRecs[0] == 'error') { sndError( pRes, mRecs[1] ); return }  // .(30402.05.13 RAM say aRoute found)
        } else {
            mRecs     =  [ { Email: "", PIN: "" } ]
            }
//     var  aHTML     =  fmtHTML( mRecs[0], await fmtStyles( ) )                                            // .(30402.04.1)
       var  aHTML     =  await fmtHTML( mRecs[0] )                                                          // .(30403.01.1)
                         sndHTML( pRes, aHTML, `${aRoute}${pReq.args}`, "Login_getRouteHandler" )           // .(30331.01.1)
            }
//     ---  ------------------  =   --------------------------------

 async function  fmtSQL( pArgs ) {
    return `SELECT * FROM login_check_view WHERE Id = ${ pArgs.id } `
            }; // eof fmtSQL
//     ---  ------------------  =   --------------------------------

 async function  fmtHTML( pData ) {
    return  await Login_fmtHTML( pData )                                                                    // .(30403.01.2 RAM Use shared function )
            }; // eof fmtHTML
//     ---  ------------------  =   --------------------------------
         }; // eof Login_getRoute
//--------  ------------------  =   -------------------------------- -----

//-(addLogin)-------------------------------------------------------------

  this.Login_postRoute = function( ) {

       var  pValidArgs =  { username : /[a-zA-Z0-9]+/
                          , password : /[a-zA-Z0-9]{4,}/
                            }
            setRoute( pApp, 'post', '/login', Login_postRouteHandler )

//     ---  ------------------  =   --------------------------------

 async function Login_postRouteHandler( aMethod, pReq, pRes, aRoute ) {

                         sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }

       var  mRecs1    =  await getData( pDB,  fmtSQL1( pArgs  ), aRoute );                                  // .(30403.01.3 RAM Check if username & password are in DB)

        if (mRecs1[0] == 'error') {  // sndError( pRes, mRecs1[1] ); return

       var  pArgs2    =  pArgs;   pArgs.password=""; // { username: pArgs.username, password: '' }
       var  aHTML     =  await fmtHTML( pArgs2,  "Unknown Username and/or password" )                       // .(30403.02.2)
                         sndHTML( pRes, aHTML, `${aRoute}${pReq.args}`, "Login_postRouteHandler_Err" )      // .(30331.01.1)
        } else {

       var  mRecs2    =  await putData( pDB, fmtSQL2( mRecs1[0] ), aRoute ); if (mRecs2[0] == 'error') { sndError( pRes, mRecs2[1] ); return }  // .(30403.05.4).(30403.02.3 RAM Delete prior Login records)
       var  mRecs3    =  await putData( pDB, fmtSQL3( mRecs1[0] ), aRoute ); if (mRecs3[0] == 'error') { sndError( pRes, mRecs3[1] ); return }  // .(30403.05.5).(30403.02.4 RAM Change getData to putData)
//     var  mRecs4    =  await getData( pDB, fmtSQL3( mRecs2[0] ), aRoute ); if (mRecs3[0] == 'error') { sndError( pRes, mRecs3[1] ); return }
       var  aFile     =  './home/index.html'
                         sndFile( pRes, aFile, `${aRoute}${pReq.args}`, "Login_postRouteHandler" )          // .(30331.01.1).(30403.04.4)
                         }
            }
//     ---  ------------------  =   --------------------------------

 async function fmtHTML( pData ) { return await Login_fmtHTML( pData ) }                                    // .(30403.01.4 RAM Use shared function )

//     ---  ------------------  =   --------------------------------

  function  fmtSQL1( pArgs ) {

    return  `SELECT * FROM login_view2
              WHERE Email    = '${ pArgs.username }'
                AND Password = '${ pArgs.password }'
                AND Active   = 'Y'`
            }; // eof fmtSQL1
//     ---  ------------------  =   --------------------------------

  function  fmtSQL2( pData ) {

    return `DELETE FROM login  WHERE MemberId = ${pData.Id}`
            }; // eof fmtSQL2
//     ---  ------------------  =   --------------------------------

  function  fmtSQL3( pData ) {

       var  aNow = (new Date).toISOString().replace( /T/, ' ').substring(0,19)
            pData.LastPageVisited = ``
            pData.LogInDateTime   = `STR_TO_DATE('${aNow}','%Y-%m-%d %H:%i:%s')`
            pData.LogOutDateTime  =  null
            pData.CreatedAt       =  pData.LogInDateTime
            pData.UpdatedAt       =  pData.LogInDateTime

       var aSQL =
           `INSERT INTO login
                 ( MemberId, LastName, LastPageVisited, LogInDateTime, LogOutDateTime, CreatedAt, UpdatedAt )
            VALUES
                 (  ${pData.Id }, '${pData.LastName}', '${pData.LastPageVisited}'
                 ,  ${pData.LogInDateTime}
                 ,  ${pData.LogOutDateTime}
                 ,  ${pData.CreatedAt}
                 ,  ${pData.UpdatedAt}
                    ); `
    return  aSQL
            }; // eof fmtSQL3
//     ---  ------------------  =   --------------------------------
         }; // eof Login_postRoute
//--------  ------------------  =   -------------------------------- -----

//          fmtHTML =       function( pData ) { ... }                                              // .(30330.06.3 Beg RAM Write function fmtLogin).(30402.04.3 RAM Add styles )
 async function Login_fmtHTML( pData, aErr ) {                                                     // .(30403.01.5 Beg Move to shared async function ).(.30403.05.1)

       var  mStyles   = [ '.Section1Title', '.login', '.login form', '.login h1' , '.login form label'
                        , '.login form input[type="password"], .login form input[type="text"]'
                        , '.login form input[type="submit"]', '.login form input[type="submit"]:hover'
                           ]
       var  aStyles   =  await getStyles( '../../login/login.css', mStyles )
            aStyles  += `#ErrorMsg : { display=${ aErr ? 'block' : 'none' }`

       var  aHTML = `
      <style> ${aStyles } </style>                                                    <!-- .(30402.04.4 RAM Add Styles) -->
      <div class="Section1Title">institute of database developers</div>
      <div class="login">
          <h1>Login</h1>
          <form action="/login" method="post">
            <label for="username">
              <!-- font awesome icon -->
              <i class="fas fa-user"></i>
            </label>
            <input type="text"     name="username" placeholder="eMail"    id="username" value="${pData.Email}" required>
            <label for="password">
              <i class="fas fa-lock"></i>
            </label>
            <input type="password" name="password" placeholder="Password" id="password" value="${pData.PIN}" required>
          <input type="submit" value="Login">
        </form>
        <div id="ErrorMsg">${aErr}</div>
      </div><!-- eof class login -->
      `
    return  aHTML
            } // eof Login_fmtHTMLogin                                                                      // .(30330.06.3 End)
//     ---  ------------------  =   --------------------------------

//========================================================================


//=meetings================================================================
//-(Meeting Notification)--------------------------------------------------

  this.Meetings_getRoute = function( ) {

          setRoute(  pApp, 'get', '/meetings',          Meetings_getRouteHandler, { id : /[0-9]+/ }, `SELECT * FROM meetings_view` )

//     ---  ------------------  =   --------------------------------

 async function Meetings_getRouteHandler ( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

                           sayMsg(  pReq, aMethod, aRoute )
       var  pArgs       =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  aSQL        =  chkSQL(  fmtSQL, pArgs )                                                         // .(30403.06.6)
       var  mRecs       =  await getData( pDB,   aSQL ); if (mRecs[0] == 'error') { sndError( pRes, mRecs[1] ); return }
                           sndRecs( pRes, mRecs, aSQL, aRoute, "Meetings_getRouteHandler" )                 // .(30331.02.2)
            } // eof onRoute
//     ---  ------------------  =   --------------------------------
         }; // eof getmeetings
//--------  ------------------  =   -------------------------------- -----
//========================================================================


//=members=================================================================
//-(Members Listing)-------------------------------------------------------

  this.Members_getRoute = function( ) {

            setRoute( pApp, 'get', '/members',          JSON_getRouteHandler, `SELECT * FROM members_view` )

         }; // eof getMembers
//--------  ------------------  =   -------------------------------- -----
//========================================================================


//=members_bios============================================================
//-(Bios)------------------------------------------------------------------

this.MembersBios_getRoute = function( ) {

            setRoute( pApp, 'get', '/members_bios',     JSON_getRouteHandler, `SELECT * FROM members_bios_view` )

         }; // eof getMembersBios
//--------  ------------------  =   -------------------------------- -----
//========================================================================


//=members_projects========================================================
//-(Project Listing)-------------------------------------------------------

this.MembersProjects_getRoute = function( ) {

            setRoute( pApp, 'get', '/members_projects', JSON_getRouteHandler, `SELECT * FROM members_projects_view` )

         }; // eof getMembersProjects
//--------  ------------------  =   -------------------------------- -----

//=projects================================================================
//-(Project Details)-------------------------------------------------------

this.Projects_getRoute = function( ) {

//          setRoute( pApp, 'get', '/projects',         JSON_getRouteHandler, `SELECT * FROM members_projects_collaboration_view` )
            setRoute( pApp, 'get', '/projects',         JSON_getRouteHandler, `SELECT * FROM members_projects_colaboration_view` )

         }; // eof getProjects
//--------  ------------------  =   -------------------------------- -----
//========================================================================


//=    User   ============================================================
//-(getUser)--------------------------------------------------------------

 this.Users_getOneRoute = function( ) {

            setRoute( pApp, 'get', '/user',             JSON_getRouteHandler, ( pArgs ) => {
    return `SELECT * FROM users WHERE Id = ${ pArgs.id } `
            } );
         }; // eof getUser
//--------  ------------------  =   -------------------------------- -----

//-(getUsers)-------------------------------------------------------------

  this.Users_getAllRoute = function( ) {                                                // .(30328.04.1 Beg RAM Add getUsers)

            setRoute( pApp, 'get', '/users',            JSON_getRouteHandler, `SELECT * FROM users ` )

         }; // eof getUsers                                                             // .(30328.04.1 End)
//--------  ------------------  =   -------------------------------- -----

//-(addUser)-----------------------------------------------------------------

this.addUser  =  function( ) {                                                          // .(30328.05.1 Beg RAM Add addUser)

       var  aRoute = `/user`
       var  pValidRoutes =
              { id       : /[0-9]+/
              , name     : /[a-zA-Z]+/
                }
            setRoute( pApp, 'post', aRoute,             JSON_getRouteHandler, fmtSQL, pValidRoutes )
  function  fmtSQL( pArgs ) {
    return  ` INSERT INTO  members_view
                        (  Name = '${ pArgs.name }'
            `
            }; // eof fmtSQL
//     ---  ------------------  =   --------------------------------
         }; // eof addUser                                                              // .(30328.05.1 End)
//--------  ------------------  =   -------------------------------- -----
//========================================================================

//END OF FETCHES

//========================================================================

this.ProjectCollaborators_getRoute = function( ) {

       var  aRoute    = '/project_collaborators'
       var  pValidArgs=  { id: /[0-9]+/ }
//     ---  ------------------  =   --------------------------------

   pApp.get( `${aAPI_Host}${aRoute}`, async function( pReq, pRes ) {

                         sayMsg(  pReq, 'get', aRoute )
       var  pArgs     =  chkArgs( pReq, pRes,  pValidArgs  ); if (!pArgs) { return }
       var  aSQL      =  chkSQL(  fmtSQL, pArgs )                                       // .(30403.06.7)
       var  mRecs     =  await getData( pDB,   aSQL  );
                         sndRecs( pRes, mRecs, aSQL, aRoute )

            } ) // eof pApp.get( /project_colaborators )
                         sayMsg( 'get', aRoute )
//     ---  ------------------  =   --------------------------------

  function  fmtSQL( pArgs ) {
       var  nId       =  pArgs.id || 0
       var aSQL       = `
          SELECT  Distinct *
            FROM  members_projects_view
 ${ nId ? `WHERE  ProjectId = ${ nId }` : `` } `
   return  aSQL
            }; // eof fmtSQL
//     ---  ------------------  =   --------------------------------
         }; // eof getProjectCollaborators
//---- -------------------------------------------------------------------

//------------------------------------------------------------------------------

async function  JSON_getRouteHandler( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

                         sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  aSQL      =  chkSQL(  fmtSQL, pArgs )                                       // .(30403.06.8)
       var  mRecs     =  await getData( pDB,   aSQL  ); if (mRecs[0] == 'error') { sndError( pRes, mRecs[1] ); return }
                         sndRecs( pRes, mRecs, aSQL, aRoute, "JSON_getRouteHandler" )

        } // eof onRoute
//---- -------------------------------------------------------------------

this.init = function( pApp_, bQuiet_ ) {
            pApp   =  pApp_  // express()
      var { pDB_,     aAPI_Host_, bQuiet_ } = init( pApp, pDB_Config, bQuiet_ );     // no workie without var, and must returned vars must be underlined
//          pDB    =  pDB_; aAPI_Host = aAPI_Host_, bQuiet = bQuiet_                 // but only works for objects, not "singleton"s. Probably not true, just a theory
            pDB    =  pDB_; aAPI_Host = aAPI_Host_                                   // and must use underlined vars to reset globals
            }
//---- -------------------------------------------------------------------

this.start = function( nPort ) { start( pApp, nPort, aAPI_Host ) }

//     -------------------------------------------------------------
    } // eoc IODD
//  --------------------------------------------------------------------------

export { IODD }
