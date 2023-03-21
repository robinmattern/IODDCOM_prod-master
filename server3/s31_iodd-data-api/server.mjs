
  import    express   from 'express'

  import  { IODD  }   from './api/IODD-Server.mjs'

       var  pIODD  =  new IODD

       var  pApp   =  express()

            pIODD.init( pApp,true )
            pIODD.getRoot( "/" )
            pIODD.getLogin( )
            pIODD.getMembers( )
            pIODD.getProjects( )
            pIODD.getProjectCollaborators( )
            pIODD.getMemberProjects( )
            pIODD.getProjectCollaboratorsLetters( '/letters' )
            pIODD.getMeetings( )
            pWorld.start( )



