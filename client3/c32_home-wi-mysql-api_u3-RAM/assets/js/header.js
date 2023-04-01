
        // function setCookie(cname, cvalue, exdays) {
        //     var d = new Date();
        //     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        //     var expires = "expires="+d.toUTCString();
        //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        // }

        // setCookie("MemberID", 1, 30);

        //document.cookie = "MemberID = 90";

        //let c = 1;
        // let c = document.cookie.substr(14,2);

        //document.cookie = "aLoginCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        //  debugger

        var nSay = 1, nSay2 = 1                                                         // .(30329.02.1 RAM Added sayMsg)

// -------------------------------------------------------------------------

        var c = document.cookie;
        var n = c.indexOf("=")
        if (n > 0) {
            var id = c.substring(n+1)   
        }
        else {
            var id = 0
        }
        //let id = ( n > 0 ) ? c.substring(n+1) : 0;
        
        sayMsg( 'header.js[1]   UserID = "' + id + '"', nSay2)                            // .(30329.02.2)

        setLoginBtn( id )                                                               // .(30329.03.1 RAM Add function) 

//      return                                                                          //#.(30330.01.1 RAM Does this exit? Nope. Illegal return statement) 
/*                                                                                      //#.(30330.01.2 RAM Gotta comment it out) 
//  ------------------------------------------------------------

        var nLoginCount = c
        //var nLoginCount = 0

        if (id > 0)  
        {
            //alert("id = " + id )
            let aLogIn = "RS";
            //let aLogIn = "<a href='#' title='Welcome' style='text-decoration:none;'>RS</a>";
            var pSpan = $("#log") 
//          document.getElementById("log").innerHTML = aLogIn;                          // .(30330.01.3 RAM There is no HTML element with id="log")  
            $("#ContactAll").css("display", "block");
            $("#ContactLink").css("display", "block");
            $("#ContactDrop").css("display", "block");
            pSpan.css("text-decoration", "none");
            pSpan.css("color", "white");
            pSpan.css("padding", "4px");
            pSpan.css("background-color", "blue");
            pSpan.css("font-size", "18px");
            pSpan.css("font-weight", "500");
            pSpan.css("font-family", "monospace");
            pSpan.css("text-align", "center");
            pSpan.css("border-radius", "50%");
            pSpan.css("border", "solid #5A5A5A 3px");
//          pSpan.css("display", "block");  sayMsg( `header.js[2] Setting #log to block (id = "${id}")`)    // .(30329.02.3)          
        } 
        else if (id == 0)
        {
            let aLogIn = "Log In";
            //let aLogIn = "<a class="login" href='../login/login.html'>Log In</a>";            
            var pSpan = $("#log") 
            pSpan.css("text-decoration", "none");
//          document.getElementById("log").innerHTML = aLogIn;                          // .(30330.01.4 RAM)  
            $("#ContactAll").css("display", "none");
            $("#ContactLink").css("display", "none");
            $("#ContactDrop").css("display", "none");
            pSpan.css("color", "white");
            pSpan.css("padding", "5px");
            pSpan.css("width", "60px");
            pSpan.css("background-color", "blue");
            pSpan.css("font-size", "15px");
            pSpan.css("font-weight", "600");
            pSpan.css("font-family", "arial");
            pSpan.css("text-align", "center");
            pSpan.css("border-radius", "8px");
            pSpan.css("border", "solid #5A5A5A 0px");
            pSpan.css("display", "flex"); sayMsg( `header.js[3] Setting #log to flex (id = "${id}")`)       // .(30329.02.4)
        }
        else
        {
//          $("#log").css("display", "none"); sayMsg( `header.js[4] Setting #log to none (id = "${id}")`)   // .(30329.02.5)
        }
  */                                                                                    //#.(30330.01.3)




        function myFunction(x) 
        {
            if (x.matches) {        // If media query matches
                $("#log").css("display", "none");
                // document.body.style.backgroundColor = "yellow";
                sayMsg( `header.js[5]   Setting #log to none (max-width < 500px)")`)    // .(30329.02.6)
            }
            else 
            {
                $("#log").css("display", "flex");
                // document.body.style.backgroundColor = "pink";
                sayMsg( `header.js[6]   Setting #log to flex (max-width > 500px)")` )   // .(30329.02.7)
            }
        }

        var x = window.matchMedia("(max-width: 500px)")
            myFunction(x)               // Call listener function at run time
            x.addListener(myFunction)   // Attach listener function on state changes

            sayMsg( 'header.js[7]   End of Script' )                                     // .(30329.02.15))

// -------------------------------------------------------------------------

  async  function setLoginBtn( nID ) {                                                    // .(30329.03.3 Beg RAM Write function setLoginBtn)
//       sayMsg( `URI: "${window.location.href}"`, 2)

    var  bHome = window.location.href.match( /index.html/ ) != null
    var  aHRef = `${ bHome ? '' : '../' }login/login.html`

    var  pBtn = $( ".HeaderNavListItemLogin" )

     if (nID > 0) {
    var  pLoginData = await fetchLoginData( nID )                                       // .(30329.04.1 RAM Use it)

//       pBtn.html(`<span style="color:white;">${pLoginData.code}</span>`)
         pBtn.html(`<a href="${aHRef}" style="color:white;" title="Welcome">${pLoginData.code}</a>`)
//       pBtn.css( "color"  , 'white')
//       pBtn.css( "display", 'block')
         sayMsg( `setLoginBtn[1] Login Btn Code set to: "${pLoginData.code}"`, nSay2 )  // .(30329.02.10)

     } else {
         pBtn.html(`<a href="${aHRef}" style="color:white;" title="Log In">Log&nbsp;In</a>`)
         }
      }                                                                                 // .(30329.03.3 End)
//   -----  ---------------------------------------------------------

  async  function fetchLoginData( nID ) {                                               // .(30329.04.2 Beg RAM Write function fetchLoginData)

    var  pLoginData = { id: 0, code: "", name : "", email: "" }

     if (nID == 90) {
         pLoginData =
           { id   :  nID
           , code : "RS"
           , name : "Rick Schinner"
           , email: "rjs@gmail.com"
             }
         }
     if (nID == 91) { pLoginData = { id: nID, code: "BT", name : "Bruce Troutman", email: "bruce.troutman@gmail.com" } }
     if (nID == 92) { pLoginData = { id: nID, code: "RM", name : "Robin Mattern",  email: "robin.mattern@gmail.com"  } }

 return  pLoginData
      }                                                                                 // .(30329.04.2 End)
//   -----  ---------------------------------------------------------

   function sayMsg( aMsg, nSay_) {                                                      // .(30329.02.11 Beg RAM Write function)
            nSay_ =  nSay_ ? nSay_ : nSay
        if (nSay_ == 1 || nSay_ == 3) { console.log( aMsg) }
        if (nSay_ == 2 || nSay_ == 3) {       alert( aMsg) }
            }                                                                           // .(30329.02.11 End)
// --------------------------------------------------------------
