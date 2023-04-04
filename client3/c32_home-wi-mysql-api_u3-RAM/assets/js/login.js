       var  nSay = 1, nSay2 = 1                                                         // .(30329.02.1 RAM Added sayMsg)

       var  nID  = window.location.search.match( /id=([0-9]+)/)                         // .(30329.09.1 RAM Get nID from URL)
            nID  = (nID && nID[1]) ? nID[1] : 0                                         // .(30329.09.2)

            document.cookie = "UserID = ; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;"
            document.cookie = `UserID = ${nID}; path=/`
//          sayMsg( `User ID set to ${nID}\nCookie now is: '${document.cookie}'`,2 )    //#.(30329.02.12)
            sayMsg( `login.js[1]    Cookie now set to: '${document.cookie}'`,nSay2 )       // .(30329.02.12)

            setUserForm( nID )                                                          // .(30329.06.1 RAM Use it)
            sayMsg( `login.js[2]    End of script` )                                    // .(30329.02.13)

//--------  ---------------------------------------------------------

  async function setUserForm( nID ) {                                                   // .(30329.06.2 Beg RAM Write function setUserForm)

       var  pUser = await fetchLoginData( nID )
       var  pForm = document.forms[0]
            pForm.username.value = pUser.email
            sayMsg( `setUserForm[1] pForm.username set to "${pForm.username.value}"`) // , 2)
            }                                                                           // .(30329.06.2 End)
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
