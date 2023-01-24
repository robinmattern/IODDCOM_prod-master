//---------------------------------------------------------------------------------------------------
 
       aTests='live in Browser'
//     aTests='test1 in NodeJS'

  var aHeadRow = `<tr class="head-row"><td>Name</td><td>Email</td><td>Phone / Mobile</td></tr>`

  if ( aTests.match( /test1/ ) ) { 

       var  pJSON    =  parseJSON( '../json/db.json.js' )
       var  aHTML    =  fmtProjects(  pJSON )

            console.log( aHTML )
            }

//---------------------------------------------------------------------------------------------------

function  fmtProjects( pJSON ) {     
       var  mProjects =  pJSON.projects

//       var  aHTML    =  mProjects.map( fmtProject ).join( "\n" )
         var  aHTML    =  mProjects.sort(sortitem).map( fmtProject ).join( "\n" )
//     var  mHTMLs=[];  mProjects.forEach( ( pProject, i ) => { fmtProject( pProject, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtProject( pProject, i ) {

       var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
//     var  aClass = "class=row-" + ( i % 2 ? "even" : "odd" )
//     var  aClass   =   (  `class="row-even"` )

       var  aName    =     pProject.Name
       var  aClient  =     pProject.Client

       var  aRow     = `  
       		<tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                 <td class="name">${ aName }</a></td>
                 <td class="client">${ aClient }"></td>
            </tr>`

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

