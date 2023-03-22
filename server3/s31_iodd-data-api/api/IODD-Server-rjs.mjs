//  --------------------------------------------------------------------------

import  express from  'express';

import { chkArgs, sndHTML, getData, sndRecs } from './assets/mjs/server-fns.mjs';
import { init, start, sayMsg                } from './assets/mjs/server-fns.mjs';

//--------  -----------------------------------------------------------------------------

if (process.argv[1].replace( /.*[\\/]/, '' ).match( /IODD.*\.mjs/ )) {

   var  pApp      =  express()
   var  pIODD     =  new IODD

        pIODD.init( pApp )
        pIODD.getRoot( "/" )
        pIODD.getLogin( )
        pIODD.getMembers( )
        pIODD.getProjects( )
        pIODD.getProjectCollaborators( )
        pIODD.getMembersProjects( )
        pIODD.getProjectCollaboratorsLetters( '/letters' )
        pIODD.getMeetings( )
        pIODD.start( )
   }
//--------  -----------------------------------------------------------------------------

function  IODD ( ) {

   var  pApp, pDB, aAPI_Host          // Doesn't work for bQuiet, because it is not used in this module

   var  pDB_Config= { }

//------------------------------------------------------------------------------

this.getTable = function( aGetRoute, pValidArgs ) {

    var aMethod   = 'get'
    var aRoute    = '/table'

        aGetRoute =  aGetRoute  ? aGetRoute  : aRoute
        pValidArgs=  pValidArgs ? pValidArgs :
                   { recs:    /[0-9]/
                   , letters: /([a-z],)*[a-z]/
                     }
//          ---------------------------------------------------

        setRoute(    aMethod, aGetRoute, pValidArgs, fmtSQL )

//          ---------------------------------------------------

function fmtSQL( pArgs ) {
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

this.getRoot  = function( aGetRoute, pValidArgs ) {

   var  aMethod   = 'get'
   var  aRoute    = '/'

        aGetRoute =  aGetRoute  ? aGetRoute  : aRoute
        pValidArgs=  pValidArgs ? pValidArgs : { }
//          ---------------------------------------------------

   pApp.get( `${aAPI_Host}${aGetRoute}`, function( pReq, pRes ) {

                     sayMsg(  pReq, aMethod, aGetRoute )
   var  pArgs     =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
   var  aHTML     =  fmtRoot( pArgs.name || '' )
                     sndHTML( pRes, aHTML, `${aGetRoute}${pReq.args}` )

        } )   // eof pApp.get( / )
                     sayMsg(  aMethod, aGetRoute )
//          ---------------------------------------------------

function  fmtRoot( aName ) {
   var  aHTML = `
            Welcome ${aName} to IODD MySQL Express Server API.<br>
            Use any of the following APIs:<br>
            <div style="margin-left:20px">
            <a href="/login"                        >/login</a><br>
            <a href="/meetings"                     >/meetings</a><br>
            <a href="/members"                      >/members</a><br>                
<!--        <a href="/members?recs=10"              >/members?recs=10</a><br>-->
            <a href="/members_bios"                 >/members_bios</a><br>
            <a href="/members_projects"             >/members_projects</a><br>
            <a href="/projects"                     >/projects</a><br>
<!--
            <a href="/projects?letters=a,r"         >/projects?letters=a,r</a><br>
            <a href="/project_colaborators"         >/project_colaborators</a><br>
            <a href="/project_colaborators_letters" >/project_colaborators_letters</a><br>
-->
            </div> `;
return  aHTML
        }; // eof fmtRoot
//     ---  ---------------------------------------------------
   } // eof getRoot
//---- -------------------------------------------------------------------



// BEGINNING OF FETCHES

//=login===================================================================
//-------------------------------------------------------------------------

this.getLogin = function( ) {

  var  aRoute = `${aAPI_Host}/login`

  pApp.get( aRoute, async ( pReq, pRes ) => onGetRoute( pReq, pRes, '/login', { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM login_check_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getLogin
//---- -------------------------------------------------------------------
//========================================================================


//=meetings================================================================
//-------------------------------------------------------------------------

this.getMeetings = function( ) {

  var  aRoute = `${aAPI_Host}/meetings`

  pApp.get( aRoute, async ( pReq, pRes ) => onGetRoute( pReq, pRes, '/meetings', { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM meetings_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getmeetings
//---- -------------------------------------------------------------------
//========================================================================


//=members=================================================================
//-------------------------------------------------------------------------

this.getMembers = function( ) {

  var  aRoute = `${aAPI_Host}/members`

  pApp.get( aRoute, async ( pReq, pRes ) => onGetRoute( pReq, pRes, '/members', { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM members_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getMembers
//---- -------------------------------------------------------------------
//========================================================================


//=members_bios============================================================
//-------------------------------------------------------------------------

this.getMembersBios = function( ) {

  var  aRoute = `${aAPI_Host}/members_bios`

  pApp.get( aRoute, async ( pReq, pRes ) => onGetRoute( pReq, pRes, '/members-bios', { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM members_bios_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getMembersBios
//---- -------------------------------------------------------------------
//========================================================================


//=members_projects========================================================
//-------------------------------------------------------------------------

this.getMembersProjects = function( ) {

  var  aRoute = `${aAPI_Host}/members_projects`

  pApp.get( aRoute, async ( pReq, pRes ) => onGetRoute( pReq, pRes, '/members_projects', { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM members_projects_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getMembersProjects
//---- -------------------------------------------------------------------


//=projects================================================================
//-------------------------------------------------------------------------

this.getProjects = function( ) {

  var  aRoute = `${aAPI_Host}/projects`

  pApp.get( aRoute, async ( pReq, pRes ) => onGetRoute( pReq, pRes, '/projects', { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM projects_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getProjects
//---- -------------------------------------------------------------------
//========================================================================

//END OF FETCHES




function  setRoute( aMethod, aRoute_, pValidArgs, fmtSQL ) {

   var  aRoute   = `${aAPI_Host}${aRoute_}`
        fmtSQL   =  fmtSQL ? fmtSQL : pValidArgs

switch (aMethod) {
  case 'get'   : pApp.get(    aRoute, async function( pReq, pRes )    { onGetRoute(    pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
  case 'post'  : pApp.post(   aRoute, async function( pReq, pRes )    { onPostRoute(   pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
  case 'put'   : pApp.put(    aRoute, async         ( pReq, pRes ) => { onPutRoute(    pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
  case 'delete': pApp.delete( aRoute, async         ( pReq, pRes ) => { onDeleteRoute( pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
//    case 'patch' : pApp.patch(  aRoute, xController ); break
    default    : null
        }
        sayMsg( 'get', aRoute_ )
 }
//---- -------------------------------------------------------------------

async function  onGetRoute( pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

                     sayMsg(  pReq, 'get', aRoute )
   var  pArgs     =  chkArgs( pReq, pRes,  pValidArgs  ); if (!pArgs) { return }
   var  aSQL      =  fmtSQL(  pArgs )
   var  mRecs     =  await getData( pDB,   aSQL  );
                     sndRecs( pRes, mRecs, aSQL, aRoute )

        } // eof pApp.get( /{aGetRoute}, onGetRoute )
//---- -------------------------------------------------------------------

    this.init  = function( pApp_, bQuiet_ ) {
        pApp  =  pApp_  // express()
  var { pDB_,    aAPI_Host_, bQuiet_ } = init( pApp, pDB_Config, bQuiet_ );  // no workie without var, and must returned vars must be underlined
        pDB   =  pDB_; aAPI_Host = aAPI_Host_                                // and must use underlined vars to reset globals
   }
//     -------------------------------------------------------------

this.start = function( nPort ) { start( pApp, nPort, aAPI_Host ) }

//     -------------------------------------------------------------
}
//  --------------------------------------------------------------------------

export { IODD }
