  import { inspect } from 'util'

  function setRoute( aMethod, aRoute, pValidArgs_, fmtSQL_) { 
     var { pValidArgs, fmtSQL } = chkArgs4SQL( pValidArgs_, fmtSQL_ )
           console.log( `pValidArgs: ${ inspect( pValidArgs, { depth: 99 } ) }, fmtSQL: '${ inspect(fmtSQL, {depth:99})}'` ) 
           }

  function chkArgs4SQL( pValidArgs, fmtSQL_ ) {               // .(30328.02.1 RAM Don't switch Args)
    var  fmtSQL     = (typeof(fmtSQL_) != 'undefined') ? fmtSQL_ : '' // pValidArgs || ''     
         pValidArgs =  pValidArgs ? pValidArgs : {}
     if (typeof(fmtSQL) == 'object' || typeof(pValidArgs) == 'function') {      // .(30328.02.2 Beg RAM Switch if object) 
         fmtSQL     =  typeof(pValidArgs) != 'object' ? pValidArgs : ''  
         pValidArgs =  fmtSQL_ || {}                                                // .(30328.02.2 End) 
         }
//   if (typeof(pValidArgs) == 'string') { pValidArgs = {} }    
     if (typeof(pValidArgs) == 'string') { fmtSQL = pValidArgs; pValidArgs = {} }    
//       console.log( `pValidArgs: ${ inspect( pValidArgs, { depth: 99 } ) }, fmtSQL: '${ inspect(fmtSQL, {depth:99})}'` ) 
return { pValidArgs, fmtSQL }
        }

    var ob = {a:1}        
//      setRoute( 'get', '/foo'             )  // {}, ''        OK
//      setRoute( 'get', '/foo',  ''        )  // {}, ''        OK
//      setRoute( 'get', '/foo',  '', ''    )  // {}, ''        OK
//      setRoute( 'get', '/foo',  '', {}    )  // {}, [object]  SB: {}, '' 
//      setRoute( 'get', '/foo',  '', ob    )  // ob, [object]  SB: ob, '' 

//      setRoute( 'get', '/foo',  {}, ''    )  // {}, ''        OK
//      setRoute( 'get', '/foo',  ob, ''    )  // ob, ''        OK
//      setRoute( 'get', '/foo',  '', 'SQL' )  // {}, 'SQL'     OK
//      setRoute( 'get', '/foo',  ob, 'SQL' )  // ob, 'SQL'     OK
//      setRoute( 'get', '/foo',  {}, 'SQL' )  // {}, ''        OK 

    //  setRoute( 'get', '/foo',  {}        )  // {}, [object]  SB: {}, '' 
    //  setRoute( 'get', '/foo',  ob        )  // ob, [object]  SB: ob, '' 
    //  setRoute( 'get', '/foo',  {},   {}  )  // {}, [object]  SB: {}, '' 
    //  setRoute( 'get', '/foo',  ob,   {}  )  // {}, [object]  IS: {}, '' 
    //  setRoute( 'get', '/foo',  {},   ob  )  // {}, [object]  SB: ob, '' 
    //  setRoute( 'get', '/foo', 'SQL', {}  )  // {}, [object]  SB: {}, 'SQL' 
    //  setRoute( 'get', '/foo', 'SQL', ob  )  // ob, 'SQL'     OK 

//      setRoute( 'get', '/foo',  fn        )  // fn,  fn ''    SB: {}, fn  
//      setRoute( 'get', '/foo',  fn,  ob   )  // ob,  fn       OK
//      setRoute( 'get', '/foo',  fn,  ''   )  // fn,  ''       SB: {}, fn
//      setRoute( 'get', '/foo',  fn, 'SQL' )  // fn, 'SQL'     IS: 'SQL', fn ?? 
//      setRoute( 'get', '/foo',  fn,  {}   )  // {},  fn       OK 

//      setRoute( 'get', '/foo',  {}, fn    )  // {},  fn       OK 
//      setRoute( 'get', '/foo',  ob, fn    )  // ob,  fn       OK 
//      setRoute( 'get', '/foo',  '', fn    )  // {},  fn       OK 


function fn() { return ''  }
