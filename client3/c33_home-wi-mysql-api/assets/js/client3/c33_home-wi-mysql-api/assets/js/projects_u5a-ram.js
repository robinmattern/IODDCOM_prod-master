//---------------------------------------------------------------------------------------------------
 
            aTests   = 'live in Browser'
            aTests   = 'test1 in NodeJS'

       var  aHeadRow = `<tr class="head-row"><td>Name</td><td>Email</td><td>Phone / Mobile</td></tr>`

if (aTests.match( /test1/ ) ) { 

       var  fetch    =  require( 'node-fetch' )   // not required in Node v17.5+

//     var  pJSON    =  parseJSON( '../json/db.json.js' )
                        fetchJSON( 'http://localhost:3000/projects?recs=2' ).then( pJSON => { 

       var  aHTML    =  fmtProjects( pJSON )

            console.log( aHTML )
            } ) 

            } // eof test1
//---------------------------------------------------------------------------------------------------

  function  fmtProjects( pJSON ) {     
       var  mProjects=  pJSON.projects   

//     var  aHTML    =  mProjects.map( fmtProject ).join( "\n" )
       var  aHTML    =  mProjects.sort(sortitem).map( fmtProject ).join( "\n" )
//     var  mHTMLs=[];  mProjects.forEach( ( pProject, i ) => { fmtProject( pProject, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtProject( pProject, i ) {
       var  aClass   =  i % 2 == 1 ? "row-even" : "row-odd"
       var  aName    =  pProject.Name
       var  aClient  =  pProject.Client
       var  aType    =  pProject.ProjectType
       var  aDesc    =  pProject.Description
       var  iID      =  pProject.Id

            fetchJSON( 'http://localhost:3000/project-colaborators?id=${iID}' )
                .then(  mColsborators => { 

       var  aRow     = `  
       <tr height=0px Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
         <td class="name"><b><u>Name</u>:</b> ${ aName }</td>
         <td class="client"><b><u>Client</u>:</b> ${ aClient }</td>
       </tr>
       <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
         <td class="type" colspan=2><b><u>Type</u>:</b> ${ aType }</td>
       </tr>
       <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
         <td class="desc" colspan=2><b><u>Desc</u>:</b> ${ aDesc }</td>
       </tr>
       <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
         <td class="memberPrimary" colspan=2><b><u>Developer(s)</u>:</b> ${ mColsborators[0] }</td>
       </tr>` 

       for (i = 1; i <= mColsborators.length; i++) {
            aRow     =  aRow + `   
       <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
         <td class="memberSecondary" colspan=2>${ mColAborators[i] }</td>
       </tr>`
            }

     return aRow
            } )
//          -------  =  ----------------------
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

async function fetchJSON( aURL) {
       var  res      = await fetch( aURL )
       var  json     = await res.json( ) 
    return  json 
            }
//--------  -------  =  -------------------------------------------------------

function sortitem(a,b) {
	return (a.Name) > (b.Name) ? 1 : -1
	}
//---------------------------------------------------------------------------------------------------

