//---------------------------------------------------------------------------------------------------

       aTests='live in Browser'
//     aTests='test1 fetch iodd.com/client1/home'
//     aTests='test1 fetch formr.net/home'
//     aTests='test2 fetch /projects'

  var  aHeadRow = `<tr class="head-row"><td>Name</td><td>Email</td><td>Phone / Mobile</td></tr>`

  if ( aTests.match( /test/ ) ) {   
  var  fetch = require( 'node-fetch' )   // not required in Node v17.5+
       }
 //---------------------------------------------------------------------------------------------------
      
  if ( aTests.match( /test1/ ) ) { 

//     var  pJSON    =  parseJSON( '../json/db.json.js' )   // replaced by fetch api 
//     var  aHTML    =  fmtProjects(  pJSON )

    fetch( 'http://formr.net/home' )
           .then( res => res.text( ) )
           .then( text => console.log( text ) )     
            } // eof test1
//---------------------------------------------------------------------------------------------------

if ( aTests.match( /test2/ ) ) { 
     
    fetch( 'http://localhost:3000/projects?recs=5' )
           .then( ( res  ) => res.json( ) )
           .then( ( json ) => onFetch( json ) )
           .catch(( err  ) => console.log( `** ${err.message}` ) );      
                
  function  onFetch( pJSON ) {
       var  aHTML    =  fmtProjects( pJSON )
            console.log( aHTML )   
            } // eof onFetch 
     
        } // eof test2
//---------------------------------------------------------------------------------------------------

function  fmtProjects( pJSON ) {  

       var  mProjects =  pJSON.projects   // as defined in db.json
//     var  mProjects =  pJSON                // as defined in /projeccts api

//     var  aHTML  =  mProjects.map( fmtProject ).join( "\n" )
       var  aHTML  =  mProjects.sort(sortitem).map( fmtProject ).join( "\n" )
//     var  mHTMLs=[];  mProjects.forEach( ( pProject, i ) => { fmtProject( pProject, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtProject( pProject, i ) {

       var  aClass   =  i % 2 == 1 ? "row-even" : "row-odd"

       var  aName    =  pProject.Name
       var  aClient  =  pProject.Client

       var  aRow     = `  
       		<tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                 <td class="name">${ aName }</td>
                 <td class="client">${ aClient }</td>
               </tr>`
//          mHTMLs.push( aRow )                  
//          aData = aHeadRow + aRow
            aData = aRow
    return  aData
            }   // eof  fmtProject
//     ---  -------  =  ----------------------------------
            }   // eof  fmtProjects
//--------  -------  =  -------------------------------------------------------

  function  parseJSON(  aFile ) {
       var  pFS      =  require( 'fs' )
       var  aDir     =  __dirname
       var  aText    =  pFS.readFileSync( `${aDir}/${aFile}`, "ASCII" )
            aText    =  aText.replace( //g, "'" )
            aText    =  aText.replace( //g, "'" )

        if (aFile.match( /\.json$/)) {   
       var  pJSON    =  JSON.parse( aText )
            }
        if (aFile.match( /\.js$/)) {   
            eval( aText )    
            }

    return  pJSON
            }   // eof  parseJSON
//--------  -------  =  -------------------------------------------------------

function sortitem(a,b) {
	return (a.Name) > (b.Name) ? 1 : -1
	}
//---------------------------------------------------------------------------------------------------

