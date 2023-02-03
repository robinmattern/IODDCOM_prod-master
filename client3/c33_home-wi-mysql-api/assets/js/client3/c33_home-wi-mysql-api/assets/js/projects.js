//---------------------------------------------------------------------------------------------------
 
            aTests   = 'live in Browser'
//          aTests   = 'test1 in NodeJS'

       var  aHeadRow = `<tr class="head-row"><td>Name</td><td>Email</td><td>Phone / Mobile</td></tr>`

if (aTests.match( /test1/ ) ) { 

       var  pJSON    =  parseJSON( '../json/db.json.js' )
       var  aHTML    =  fmtProjects(  pJSON )

            console.log( aHTML )
            }

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
         <td class="memberPrimary" colspan=2><b><u>Developer(s)</u>:</b> Bruce Troutman</td>
       </tr>               
       <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
         <td class="memberSecondary" colspan=2>Richard Schinner</td>
       </tr>
       `
//          mHTMLs.push( aRow )                  
     //aData = aHeadRow + aRow
     aData = aRow
     return aData
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

