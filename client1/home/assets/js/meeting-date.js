//---------------------------------------------------------------------------------------------------

       aTests='live in Browser'
//     aTests='test1 fetch iodd.com/client1/home'
//     aTests='test1 fetch formr.net/home'
//       aTests='test2 fetch /MeetingDates'

  var  aHeadRow = `<tr class="head-row"><td>Name</td><td>Email</td><td>Phone / Mobile</td></tr>`

  if ( aTests.match( /test/ ) ) {   
  var  fetch = require( 'node-fetch' )   // not required in Node v17.5+
       }
 //---------------------------------------------------------------------------------------------------
      
  if ( aTests.match( /test1/ ) ) { 

//     var  pJSON    =  parseJSON( '../json/db.json.js' )   // replaced by fetch api 
//     var  aHTML    =  fmtMeetingDates(  pJSON )

    fetch( 'http://formr.net/home' )
           .then( res => res.text( ) )
           .then( text => console.log( text ) )     
            } // eof test1
//---------------------------------------------------------------------------------------------------

if ( aTests.match( /test2/ ) ) { 
     
    fetch( 'http://localhost:3000/home?recs=5' )
           .then( ( res  ) => res.json( ) )
           .then( ( json ) => onFetch( json ) )
           .catch(( err  ) => console.log( `** ${err.message}` ) );
                
  function  onFetch( pJSON ) {
       var  aHTML    =  fmtMeetingDates( pJSON )
            console.log( aHTML )   
            } // eof onFetch 
     
        } // eof test2
//---------------------------------------------------------------------------------------------------

function  fmtMeetingDates( pJSON ) {  

     var  mMeetingDates =  pJSON  
     var  aHTML  =  mMeetingDates.map( fmtMeetingDate ).join( "\n" )
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtMeetingDate( pMeetingDate, i ) {

       var  aMeetingDate =    pMeetingDate.strMeetingDate
       var  aRow     = `
            <table> 
              <tr>
                <td class="date"><b><u>Date</u>:</b> ${ aMeetingDate }</td>
              </tr>
            </table
            `               
//          mHTMLs.push( aRow )                  
//          aData = aHeadRow + aRow
            aData = aRow
    return  aData
            }   // eof  fmtMeetingDate
//     ---  -------  =  ----------------------------------
            }   // eof  fmtMeetingDates
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

