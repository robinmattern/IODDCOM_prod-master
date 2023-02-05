//---------------------------------------------------------------------------------------------------
 
            aTests   = 'live in Browser'
//          aTests   = 'test1 in NodeJS'
//          aTests   = 'test2 in NodeJS'

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

if (aTests.match( /test2/ ) ) { 

       var  fetch    =  require( 'node-fetch' )   // not required in Node v17.5+

                 fetchProjects() 

            } // eof test2
//---------------------------------------------------------------------------------------------------
            
  function  fmtProjects( pJSON ) {     
       var  mProjects=  pJSON.Projects   

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

//          fetchJSON( 'http://localhost:3000/project-colaborators?id=${iID}' )
//              .then(  mColsborators => { 

//var  mColaborators =  await fetchColaborators( 'http://localhost:3000/project-colaborators?id=${iID}' )
//var  mColaborators =  await fetchJSON( `http://localhost:3000/project-colaborators?id=${iID}` )
  var  mColaborators = [ { FirstName: "Bruce", LastName: "Troutman" } 
                       , { FirstName: "Rick",  LastName: "Schinner" } 
                         ]

       var  aColaborator = `${mColaborators[0].FirstName} ${mColaborators[0].LastName}`

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
         <td class="memberPrimary" colspan=2><b><u>Developer(s)</u>:</b> ${ aColaborator }</td>
       </tr>` 

       for (i = 1; i <  mColaborators.length; i++) {
       var  aColaborator = `${mColaborators[i].FirstName} ${mColaborators[i].LastName}`
            aRow     =  aRow + `   
       <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
         <td class="memberSecondary" colspan=2>${ aColaborator }</td>
       </tr>`
            }

     return aRow
//          } )
//          -------  =  ----------------------
            }   // eof  fmtProject
//     ---  -------  =  ----------------------------------
            }   // eof  fmtProjects
//--------  -------  =  -------------------------------------------------------

  async function fetchLetters( aDivId ) { 
/*   
       var  pDiv = document.createElement( 'div' );
//          pDiv.textContent = "";
            pDiv.setAttribute( 'id', 'Letter-Links' );
            document.body.appendChild( pDiv); 
       var  pParent = document.getElementById( aDivId );
            pParent.after( pDivId )
*/
       var  pStyle = document.createElement( 'style' ); 
            pStyle.textContent =                
        `   .letter { 
                margin      : 0 0 0 5px;
                font-size   : 10px; 
                }
            #Letter-Links { 
                margin      : 0 0 -16px 40px;
                }`;       
       var  pParent = document.getElementById( aDivId );
            pParent.after( pStyle );

       var  mLetters = (await fetchJSON( 'http://localhost:3000/project-colaborators-letters' )).Letters
//     var  mLetters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split( "," )
       var  pLetters = document.getElementById( aDivId )   // was: "Letter-Links" ) 
            pLetters.innerHTML = mLetters.map( aLetter => 
        `   <a class="letter" href="?letters=${aLetter}">${aLetter}</a>` 
            ).join( "" )

            }   // eof  fmtLetters
//--------  -------  =  -------------------------------------------------------
  
  async function fetchProjects( pDiv, aLetter ) { 

//     var  mProjects     = (await fetchJSON( 'http://localhost:3000/projects?recs=999'           )).Projects
       var  mProjects     = (await fetchJSON( `http://localhost:3000/projects?letters=${aLetter}` )).Projects
       var  mColaborators = (await fetchJSON( 'http://localhost:3000/project-colaborators'        )).Colaborators

        if (mProjects.Error) {
        if (pDiv) { pDiv.innerHTML =  mProjects.Error 
        } else {         console.log( mProjects.Error ) }
            return 
            }

            mProjects             =  mProjects.map( pProject => { 
            pProject.Colaborators =  mColaborators.filter( pColaborator => pProject.Id == pColaborator.ProjectId )
    return  pProject 
            } )

       var  aHTML    =  fmtProjects1( mProjects, mColaborators )

       if (pDiv) { pDiv.innerHTML =  aHTML 
       } else {         console.log( aHTML ) }

            } // eof fetchProjects  
//--------  -------  =  -------------------------------------------------------

  function  fmtProjects1( mProjects, mColaborators ) {     

       var  aHTML    =  mProjects.sort(sortitem).map( fmtProject1 ).join( "\n" )
    return  aHTML
            
//---------------------------------------------------------------------------------------------------
            
  function  fmtProject1( pProject, i ) {
       var  aClass   =  i % 2 == 1 ? "row-odd"  : "row-even"  // "row-even" : "row-odd"
       var  aName    =  pProject.Name
       var  aClient  =  pProject.Client
       var  aType    =  pProject.ProjectType
       var  aDesc    =  pProject.Description
       var  iID      =  pProject.Id
       var  mNames   =  pProject.Colaborators

       var  aColaborator =  mNames[0] ? `${mNames[0].FirstName} ${mNames[0].LastName}` : "" 
       var  aRowId       = `R${ `${ i + 1 }`.padStart( 3, "0" ) }`    

       var  aRow     = `  
       <tr   Class="${ aClass }" id="${ aRowId }" height="0px" >
         <td class="name"><b><u>Name</u>:</b> ${ aName }</td>
         <td class="client"><b><u>Client</u>:</b> ${ aClient }</td>
       </tr>
       <tr   Class="${ aClass }" id="${ aRowId }">
         <td class="type" colspan=2><b><u>Type</u>:</b> ${ aType }</td>
       </tr>
       <tr   Class="${ aClass }" id="${ aRowId }">
         <td class="desc" colspan=2><b><u>Desc</u>:</b> ${ aDesc }</td>
       </tr>
       <tr   Class="${ aClass }" id="${ aRowId }">
         <td class="memberPrimary" colspan=2><b><u>Developer(s)</u>:</b> ${ aColaborator }</td>
       </tr>
       `
       for (i = 1; i <  mNames.length; i++) {
       var  aColaborator = `${mNames[i].FirstName} ${mNames[i].LastName}`
            aRow     =  aRow +    
      `<tr   Class="${ aClass }" id="${ aRowId }">
         <td class="memberSecondary" colspan=2>${ aColaborator }</td>
       </tr>
       `
            }
            aRow     =  aRow +    
      `<tr   Class="${ aClass }" id="${ aRowId }">
         <td colspan=2 style="height:10px;"></td>
       </tr>`

     return aRow
//          } )
//          -------  =  ----------------------
            }   // eof  fmtProject1
//     ---  -------  =  ----------------------------------
            }   // eof  fmtProjects1
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

  function  sortitem(a,b) {
	return (a.Name) > (b.Name) ? 1 : -1
	}
//--------  -------  =  -------------------------------------------------------
    
     async  function fetchJSON( aURL ) {
       var  res      = await fetch( aURL )
       var  json     = await res.json( ) 
    return  json 
            }
//--------  -------  =  -------------------------------------------------------

     async  function fetchColaborators( aURL ) {
       var  pColaborators = await fetchJSON( aURL )
    return  pColaborators 
            }
//---------------------------------------------------------------------------------------------------

