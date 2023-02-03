/*

var post;

// Call the API
fetch( 'https://jsonplaceholder.typicode.com/posts/5').then( function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {

    // Store the post data to a variable
    post = data;

    // Fetch another API
    return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

}).then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (userData) {
    console.log(post, userData);
}).catch(function (error) {
    console.warn(error);
});

----------------------------------------------------------------

var post;

//  Call the API
    fetch( 'https://jsonplaceholder.typicode.com/posts/5')

 .then( response => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
        }
    } )

 .then( data => {

    post = data;  // Store the post data to a variable

    return fetch( 'https://jsonplaceholder.typicode.com/users/' + data.userId );  // Fetch another API
    } )

 .then( response => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject( response );
        }
    } )

 .then( userData => {
    console.log( post, userData);
    } )

 .catch( error => {
    console.warn( error );
    } );

----------------------------------------------------------------
*/

  var fetch = require( 'node-fetch' )

var pProject;

//  Call the API
    fetch( `http://localhost:3000/projects?recs=2` )

 .then( response => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
        }
    } )

 .then( data => {

// for (i=0; i < data.projects.length; i++ ) {

        pProject = data.projects[0];  // Store the post data to a variable

    return fetch( `http://localhost:3000/project-colaborators?id=${ pProject.Id}` );  // Fetch another API
    } )

 .then( response => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject( response );
        }
    } )

 .then( mColaborators => {
    console.log( inspect( pProject ) );
    console.log( inspect( mColaborators ) );
    } )

 .catch( error => {
    console.warn( error );
    } );


function inspect( pObj ) {
     return require( 'util' ).inspect( pObj, {depth: 99 } ) 
     }