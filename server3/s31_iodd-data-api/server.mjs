
  import    express   from 'express'
  import  { IODD  }   from './api/IODD-Server.mjs'

       var  pApp      =  express()
       var  bQuiet // =  true        // Override .env Quiet = {true|false}
       var  nPort  // =  54131       // Override .env Server_Port  

       var  pIODD     =  new IODD

            pIODD.init(  pApp, bQuiet ) 
             
            pIODD.getRoot( "/" )
            pIODD.getLogin( )
            pIODD.getMembers( )
            pIODD.getMembersBios( )
            pIODD.getProjects( )
         // pIODD.getProjectCollaborators( )
            pIODD.getMembersProjects( )
         // pIODD.getProjectCollaboratorsLetters( '/letters' )
            pIODD.getMeetings( )

            pIODD.start( nPort )



