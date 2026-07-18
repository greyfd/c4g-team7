// // // import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
// // // const SUPABASE_URL = 'https://yrybsyvpiorvidpouurv.supabase.co';
// // // const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeWJzeXZwaW9ydmlkcG91dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzA1NDAsImV4cCI6MjA5ODYwNjU0MH0.DmmK05xmbAdCy85q9ikKMls062YGMt-jdMt6u_Tc5iQ';
// // // export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// // // console.log("JS LOADED");
// // // window.Query = async function Query() {
// // //     const formData = new FormData();
// // //     const pdf = document.getElementById("pdfInput").files[0];

// // //     formData.append("pdf", pdf);
// // //     formData.append("user_id", "test-user");
// // //     await fetch(
// // //         "http://127.0.0.1:5000/queries",
// // //         {
// // //             method: "POST",
// // //             body: formData
// // //         }
// // //     )
// // // }

// // // window.Authentication = async function Authentication() {
// // //   const emailEl = document.getElementById("email");
// // //   const passwordEl = document.getElementById("password");

// // //   const email = emailEl.value.trim();
// // //   const password = passwordEl.value;

// // //   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
// // //     alert("Please enter a valid email address.");
// // //     return;
// // //   }

// // //   if (!password || password.length < 6) {
// // //     alert("Please enter a valid password (min 6 chars).");
// // //     return;
// // //   }

// // //   await supabase.auth.signUp({email, password});
// // // };

// // // window.BACK = async function BACK() {
// // //   window.location.href="test.html";
// // // }
// // import { createClient } from 
// // "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


// // const SUPABASE_URL =
// // "https://yrybsyvpiorvidpouurv.supabase.co";

// // const SUPABASE_ANON_KEY =
// // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeWJzeXZwaW9ydmlkcG91dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzA1NDAsImV4cCI6MjA5ODYwNjU0MH0.DmmK05xmbAdCy85q9ikKMls062YGMt-jdMt6u_Tc5iQ";


// // export const supabase =
// // createClient(
// //     SUPABASE_URL,
// //     SUPABASE_ANON_KEY
// // );


// // console.log("JS LOADED");



// // /*
// // =========================
// // PDF UPLOAD + AI RESPONSE
// // =========================
// // */


// // window.Query = async function(){

// //     const pdf =
// //     document.getElementById("pdfInput").files[0];


// //     const question =
// //     document.getElementById("userQuery").value;



// //     if(!pdf){

// //         alert("Upload a PDF first");
// //         return;

// //     }



// //     const formData =
// //     new FormData();


// //     formData.append(
// //         "pdf",
// //         pdf
// //     );


// //     formData.append(
// //         "user_id",
// //         "test-user"
// //     );


// //     formData.append(
// //         "question",
// //         question
// //     );



// //     try{


// //         const res =
// //         await fetch(
// //             "http://127.0.0.1:5000/queries",
// //             {

// //                 method:"POST",
// //                 body:formData

// //             }
// //         );



// //         const data =
// //         await res.json();



// //         console.log(
// //             "BACKEND:",
// //             data
// //         );



// //         localStorage.setItem(
// //             "AI_RESPONSE",
// //             data.response
// //         );


// //         localStorage.setItem(
// //             "CITATIONS",
// //             JSON.stringify(data.citations)
// //         );


// //         localStorage.setItem(
// //             "CONTEXT",
// //             data.context
// //         );



// //         window.location.href =
// //         "./response.html";



// //     }

// //     catch(error){

// //         console.log(error);

// //         alert(
// //             "Something went wrong"
// //         );

// //     }

// // };






// // /*
// // =========================
// // LOAD RESPONSE PAGE
// // =========================
// // */


// // window.addEventListener(
// // "load",
// // ()=>{


// // const responseBox =
// // document.getElementById(
// //     "responseText"
// // );



// // if(responseBox){


// //     responseBox.innerHTML =
// //     localStorage.getItem(
// //         "AI_RESPONSE"
// //     )
// //     ||
// //     "No response";



// //     const citationList =
// //     document.getElementById(
// //         "citations"
// //     );



// //     const citations =
// //     JSON.parse(
// //         localStorage.getItem(
// //             "CITATIONS"
// //         )
// //     );



// //     if(
// //         citations &&
// //         citationList
// //     ){


// //         citations.forEach(
// //         citation=>{


// //             const li =
// //             document.createElement(
// //                 "li"
// //             );


// //             // li.innerHTML =
// //             // `<a href="${citation}" target="_blank">
// //             // ${citation}
// //             // </a>`;
// //             li.innerText =
// // citation;


// //             citationList.appendChild(
// //                 li
// //             );


// //         });


// //     }



// // }



// // });






// // /*
// // =========================
// // FOLLOW UP QUESTIONS
// // =========================
// // */


// // window.FollowUp = async function(){


// // const question =
// // document.getElementById(
// //     "question"
// // ).value;



// // if(!question)
// // return;



// // const context =
// // localStorage.getItem(
// //     "CONTEXT"
// // );



// // const res =
// // await fetch(
// // "http://127.0.0.1:5000/followup",
// // {

// // method:"POST",

// // headers:
// // {
// // "Content-Type":
// // "application/json"
// // },


// // body:
// // JSON.stringify({

// // question:question,

// // context:context

// // })

// // });



// // const data =
// // await res.json();



// // const box =
// // document.getElementById(
// // "responseText"
// // );



// // box.innerHTML +=
// // `

// // <br><br>

// // <b>You:</b>
// // ${question}

// // <br><br>

// // <b>AI:</b>
// // ${data.response}

// // `;



// // document.getElementById(
// // "question"
// // ).value="";


// // };







// // /*
// // =========================
// // AUTH
// // =========================
// // */


// // window.Authentication =
// // async function(){


// // const email =
// // document.getElementById(
// // "email"
// // ).value;


// // const password =
// // document.getElementById(
// // "password"
// // ).value;



// // const {error} =
// // await supabase.auth.signUp({

// // email,
// // password

// // });



// // if(error)
// // alert(error.message);

// // else
// // alert(
// // "Account created"
// // );


// // };






// // window.BACK =
// // function(){

// // window.location.href =
// // "test.html";

// // };

// // function formatResponse(text) {
// //     return text
// //         .replace(/\n/g, "<br>")
// //         .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
// // }
// import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// const SUPABASE_URL = "https://yrybsyvpiorvidpouurv.supabase.co";
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeWJzeXZwaW9ydmlkcG91dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzA1NDAsImV4cCI6MjA5ODYwNjU0MH0.DmmK05xmbAdCy85q9ikKMls062YGMt-jdMt6u_Tc5iQ';

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// console.log("JS LOADED");

// window.Query = async function () {
//     const pdf = document.getElementById("pdfInput").files[0];
//     const question = document.getElementById("userQuery").value;

//     if (!pdf) {
//         alert("Upload a PDF first");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("pdf", pdf);
//     formData.append("user_id", "test-user");
//     formData.append("question", question);

//     try {
//         const res = await fetch("http://127.0.0.1:5000/queries", {
//             method: "POST",
//             body: formData
//         });

//         const data = await res.json();
//         console.log("BACKEND:", data);

//         localStorage.setItem("AI_RESPONSE", data.response);
//         localStorage.setItem("CITATIONS", JSON.stringify(data.citations));
//         localStorage.setItem("CONTEXT", data.context);

//         const {data: { user }} = await supabase.auth.getUser();
//         if (user) {const { error } = await supabase.from("chat_history").insert({
//                     user_id: user.id,
//                     question: question,
//                     response: data.response,
//                     citations: data.citations 
//                 });
//             if (error) {
//                 console.error("Error saving chat:", error);
//             }
//         }

//         window.location.href = "./response.html";
//     } catch (error) {
//         console.log(error);
//         alert("Something went wrong");
//     }
// };

// window.addEventListener("load", () => {
//     const responseBox = document.getElementById("responseText");

//     if (responseBox) {
//         const response = localStorage.getItem("AI_RESPONSE") || "No response";
//         responseBox.innerHTML = formatResponse(response);

//         const citationList = document.getElementById("citations");
//         const citations = JSON.parse(localStorage.getItem("CITATIONS"));

//         if (citations && citationList) {
//             citations.forEach(citation => {
//                 const li = document.createElement("li");
//                 li.innerText = citation;
//                 citationList.appendChild(li);
//             });
//         }
//     }
// });

// window.FollowUp = async function () {
//     const question = document.getElementById("question").value;

//     if (!question) return;

//     const context = localStorage.getItem("CONTEXT");

//     const res = await fetch("http://127.0.0.1:5000/followup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             question: question,
//             context: context
//         })
//     });

//     const data = await res.json();

//     const box = document.getElementById("responseText");

//     box.innerHTML += `
//         <br><br>
//         <b>You:</b> ${question}
//         <br><br>
//         <b>AI:</b><br>
//         ${formatResponse(data.response)}
//     `;

//     document.getElementById("question").value = "";
// };

// window.Authentication = async function () {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const { error } = await supabase.auth.signUp({
//         email,
//         password
//     });

//     if (error)
//         alert(error.message);
//     else
//         alert("Account created");
// };

// window.BACK = function () {
//     window.location.href = "test.html";
// };

// function formatResponse(text) {
//     return text
//         .replace(/\n/g, "<br>")
//         .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
// }

// window.Authentication = async function Authentication() {
//   const emailEl = document.getElementById("email");
//   const passwordEl = document.getElementById("password");

//   const email = emailEl.value.trim();
//   const password = passwordEl.value;

//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   if (!password || password.length < 6) {
//     alert("Please enter a valid password (min 6 chars).");
//     return;
//   }

//   await supabase.auth.signUp({email, password});
//   window.location.replace("features.html");
// };

// window.Login = async function Login(){
//   const email = document.getElementById("email");
//   const password = document.getElementById("password");
//   const {data, error} = await supabase.auth.signInWithPassword({
//     email: email.value,
//     password: password.value
//   });
//   console.log(data);
//   window.location.replace("loggedin.html")
// };

// window.addEventListener("load", () => {
//     const accountBtn = document.getElementById("accountBtn");
//     if (!accountBtn) return;
//     if (localStorage.getItem("loggedIn") === "true") {
//         accountBtn.innerHTML = "Profile";
//         accountBtn.href = "profile.html";
//     }
// });

// window.addEventListener("load", async () => {

//     const emailElement = document.getElementById("email");
//     if(!emailElement) return;


//     const {
//         data:{user}
//     } = await supabase.auth.getUser();

//     if(!user) return;


//     emailElement.innerHTML = user.email;

// });

// window.logout = async function () {
//     await supabase.auth.signOut();
//     localStorage.removeItem("loggedIn");
//     window.location.href = "login.html";
// };

// window.addEventListener("load", async () => {


//     const history = document.getElementById("history");


//     // Only run on profile page
//     if(!history) return;



//     const {
//         data:{user}
//     } = await supabase.auth.getUser();



//     if(!user){

//         window.location.href="login.html";
//         return;

//     }



//     const {data,error}=await supabase
//         .from("chat_history")
//         .select("*")
//         .eq("user_id",user.id)
//         .order("created_at",{ascending:false});



//     if(error){
//         console.error(error);
//         return;
//     }



//     data.forEach(chat=>{

//         history.innerHTML +=`

//         <div class="chat-card">

//         <h3>
//         ${chat.question}
//         </h3>


//         <p>
//         ${chat.response}
//         </p>


//         <small>
//         ${new Date(chat.created_at).toLocaleString()}
//         </small>


//         </div>

//         `;

//     });


// });

// async function loadChatHistory(){


//     const {
//         data:{
//             user
//         }
//     } = await supabase.auth.getUser();



//     if(!user){
//         window.location.href="login.html";
//         return;
//     }



//     document.getElementById("email").textContent =
//         user.email;




//     const {
//         data,
//         error
//     } = await supabase
//         .from("chat_history")
//         .select("*")
//         .eq("user_id", user.id)
//         .order("created_at",{ascending:false});




//     if(error){

//         console.error(error);
//         return;

//     }




//     const history =
//         document.getElementById("history");



//     if(data.length === 0){

//         history.innerHTML =
//         `
//         <div class="empty">
//         🧠 No conversations yet.<br>
//         Start asking questions to build your history.
//         </div>
//         `;

//         return;

//     }





//     data.forEach(chat=>{


//         const card =
//         document.createElement("div");


//         card.className="chat-card";



//         card.innerHTML=
//         `

//         <div class="question">
//         ❓ ${chat.question}
//         </div>


//         <div class="answer">
//         ${chat.response}
//         </div>


//         <div class="date">
//         ${new Date(chat.created_at)
//         .toLocaleString()}
//         </div>

//         `;



//         history.appendChild(card);


//     });



// }




// window.addEventListener(
// "load",
// loadChatHistory
// );
import { createClient } from 
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const SUPABASE_URL =
"https://yrybsyvpiorvidpouurv.supabase.co";


const SUPABASE_ANON_KEY =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeWJzeXZwaW9ydmlkcG91dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzA1NDAsImV4cCI6MjA5ODYwNjU0MH0.DmmK05xmbAdCy85q9ikKMls062YGMt-jdMt6u_Tc5iQ';


export const supabase =
createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


console.log("JS LOADED");





/*
=========================
AI PDF QUERY
=========================
*/


window.Query = async function(){


    const pdf =
    document.getElementById("pdfInput").files[0];


    const question =
    document.getElementById("userQuery").value;



    if(!pdf){

        alert("Upload a PDF first");
        return;

    }



    const formData = new FormData();


    formData.append(
        "pdf",
        pdf
    );


    formData.append(
        "question",
        question
    );


    formData.append(
        "user_id",
        "test-user"
    );



    try{


        const res =
        await fetch(
            "http://127.0.0.1:5000/queries",
            {

                method:"POST",
                body:formData

            }
        );



        const data =
        await res.json();



        localStorage.setItem(
            "AI_RESPONSE",
            data.response
        );


        localStorage.setItem(
            "CITATIONS",
            JSON.stringify(data.citations)
        );


        localStorage.setItem(
            "CONTEXT",
            data.context
        );



        // SAVE CHAT HISTORY

        const {
            data:{
                user
            }
        } =
        await supabase.auth.getUser();



        if(user){


            const {error}=

            await supabase
            .from("chat_history")
            .insert({

                user_id:user.id,

                question:question,

                response:data.response,

                citations:data.citations

            });



            if(error){

                console.error(
                    "Saving chat failed:",
                    error
                );

            }

        }



        window.location.href =
        "response.html";



    }

    catch(error){

        console.error(error);

        alert(
            "Something went wrong"
        );

    }

};







/*
=========================
LOAD RESPONSE PAGE
=========================
*/


window.addEventListener(
"load",
()=>{


const responseBox =
document.getElementById(
    "responseText"
);



if(!responseBox)
return;



const response =
localStorage.getItem(
    "AI_RESPONSE"
)
||
"No response";



responseBox.innerHTML =
formatResponse(response);




const citationList =
document.getElementById(
    "citations"
);



const citations =
JSON.parse(
    localStorage.getItem(
        "CITATIONS"
    )
);



if(citations && citationList){


    citations.forEach(
    citation=>{


        const li =
        document.createElement(
            "li"
        );


        li.innerText =
        citation;


        citationList.appendChild(li);


    });

}


});








/*
=========================
FOLLOW UP QUESTIONS
=========================
*/


window.FollowUp = async function(){


const question =
document.getElementById(
    "question"
).value;



if(!question)
return;



const context =
localStorage.getItem(
    "CONTEXT"
);



const res =
await fetch(
"http://127.0.0.1:5000/followup",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

question,
context

})

});



const data =
await res.json();



const box =
document.getElementById(
"responseText"
);



box.innerHTML +=
`

<br><br>

<b>You:</b>
${question}

<br><br>

<b>AI:</b>

<br>

${formatResponse(data.response)}

`;



document.getElementById(
"question"
).value="";


};









/*
=========================
SIGN UP
=========================
*/


window.Authentication =
async function(){


const email =
document.getElementById(
"email"
).value.trim();


const password =
document.getElementById(
"password"
).value;



if(!email || password.length < 6){

alert(
"Enter valid email and password"
);

return;

}



const {error}=

await supabase.auth.signUp({

email,
password

});



if(error){

alert(error.message);

}

else{

alert(
"Account created"
);

window.location.href =
"login.html";

}


};









/*
=========================
LOGIN
=========================
*/


window.Login =
async function(){



const email =
document.getElementById(
"email"
).value;



const password =
document.getElementById(
"password"
).value;



const {
data,
error
}=

await supabase.auth.signInWithPassword({

email,
password

});



if(error){

alert(error.message);
return;

}



localStorage.setItem(
"loggedIn",
"true"
);



window.location.href =
"loggedin.html";


};









/*
=========================
LOGOUT
=========================
*/


window.logout =
async function(){



await supabase.auth.signOut();



localStorage.clear();



window.location.href =
"test.html";


};









/*
=========================
PROFILE PAGE
=========================
*/


async function loadProfile(){



const history =
document.getElementById(
"history"
);



const email =
document.getElementById(
"email"
);



if(!history)
return;



const {
data:{
user
}

} =
await supabase.auth.getUser();



if(!user){

window.location.href =
"login.html";

return;

}




if(email){

email.innerHTML =
user.email;

}




const {
data,
error
}

=
await supabase

.from(
"chat_history"
)

.select("*")

.eq(
"user_id",
user.id
)

.order(
"created_at",
{
ascending:false
}

);



if(error){

console.error(error);
return;

}



if(data.length===0){


history.innerHTML =

`

<div class="empty">

 No conversations yet.

</div>

`;


return;


}





data.forEach(chat=>{


history.innerHTML +=

`

<div class="chat-card">


<div class="question">

${chat.question}

</div>



<div class="answer">

${chat.response}

</div>



<div class="date">

${new Date(
chat.created_at
).toLocaleString()}

</div>


</div>

`;


});



}



window.addEventListener(
"load",
loadProfile
);








/*
=========================
NAV PROFILE BUTTON
=========================
*/


window.addEventListener(
"load",
()=>{


const accountBtn =
document.getElementById(
"accountBtn"
);



if(!accountBtn)
return;



if(
localStorage.getItem(
"loggedIn"
)
==="true"

){

accountBtn.innerHTML =
"Profile";


accountBtn.href =
"profile.html";

}


});








function formatResponse(text){

return text

.replace(
/\n/g,
"<br>"
)

.replace(
/\*\*(.*?)\*\*/g,
"<b>$1</b>"
);

}

window.addEventListener("load", () => {

    const downloadButton =
    document.getElementById("downloadBtn");


    if(!downloadButton)
        return;



    downloadButton.addEventListener(
        "click",
        () => {


        const response =
        localStorage.getItem(
            "AI_RESPONSE"
        )
        ||
        "No response available";



        const citations =
        JSON.parse(
            localStorage.getItem("CITATIONS")
        )
        ||
        [];



        let fileContent = `

AI Generated Response
=====================


${response}



Citations
==========

${citations.join("\n")}


`;



        const blob =
        new Blob(
            [fileContent],
            {
                type:"text/plain"
            }
        );



        const url =
        URL.createObjectURL(blob);



        const link =
        document.createElement("a");


        link.href = url;


        link.download =
        "AI_Response.txt";



        document.body.appendChild(link);


        link.click();



        document.body.removeChild(link);


        URL.revokeObjectURL(url);


        }

    );

});

window.Notes = async function Notes() {
    window.location("Notes.html");
}

window.tabPlus = async function tabPlus () {
    const content = document.getElementById("notes").value;
    const title = document.getElementById("title").value;

    const {data:{user}} = await supabase.auth.getUser();

    const ins = await supabase.from("notes").insert({
                user_id: user.id,
                title: title,
                content: content
    });


}