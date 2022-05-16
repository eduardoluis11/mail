/* Mailbox function.
I will have to once again use the API. In this case, I will have to use a GET request (which is the automatic request if I use fetch() 
without specifying the 2nd parameter.) And the URL that I will have to put inside of the fetch() function as the 1st parameter will be 
“/emails/<mailbox>”. Of course, I may need to use notation like `{mailbox}` or something like that for JS to understand the exact route.

I will need to create a new function. I may name the function “mailbox()”. Inside of the function, I will make the fetch() call. To print 
the data from the emails into one of the mailboxes, I will use code like the following (source: https://youtu.be/Oive66jrwBs ):
  fetch('URL')
  .then((res) => res.json())
  .then((data) => {
      let variable = 'Tag_from_HTML_file';
      data.forEach(function(iteration_variable){
          variable += `
              <ul>
                  <li>ID: ${iteration_variable.id}</li>
                  <li>Body: ${iteration_variable.body}</li>
              </ul>
          `;
      });
      document.getElementById('html_element').innerHTML = variable;
  })

I may rename the function “mailbox(mailbox)”. I may call for the first time the function from “load_mailbox()”, so that I get the variable with 
the name of the mailbox that I need to load. After a bug that I had, I decided to give another name to this function, so that I don't get any bugs
when calling this function from the load_mailbox() function. If I use the name "mailbox", the load_mailbox() function will think that I'm trying 
to access the "mailbox" variable, not the function.

*/
function display_mailbox_emails(mailbox) {

  // DEBUGGING message
  console.log(mailbox)
  
  // console.log("Hello world")
  
  // fetch(`'/emails/${mailbox}'`)
  // .then((res) => res.json())
  // .then((data) => {
  //     let emails = data;
  //     data.forEach(function(email){
  //       emails += `
  //           <ul>
  //               <li>ID: ${email.id}</li>
  //               <li>Body: ${email.body}</li>
  //           </ul>
  //       `;
  //     });
  //     document.getElementById('.container').innerHTML = emails;
  // })
}

/* I need to detect whether the use is clicking on the “submit” button in the compose 
mail page. To do that, I will enter into the function that reads the whole DOM (the 
COMContentLoaded function), and I will add an event listener for the submit button. That way, 
if the user clicks on “submit”, the send_mail() function will be called (source: 
https://youtu.be/Oive66jrwBs .)

I need the ID of the <form> tag, and put it into the event listener of the submit button. In this 
case, the ID is “compose-form”.

To include the React library on my project to be able to use React, I will include the 3 CDN links 
in the inbox.js file. To include CDN links on a JS file, I will use code like the following snippet:
var variable = document.createElement('script');  
variable.setAttribute('src','CDN_Link');
document.head.appendChild(variable);
(source: Nick Weseman's reply on 
https://stackoverflow.com/questions/43796705/how-to-include-cdn-in-javascript .) I will include it 
on the DocumentOnLoaded() function, since I want to load the entire document before using React.

For convenience purposes, I will use the same React version as the one used by Brian on his “User 
Interfaces” lecture (source: https://youtu.be/jrBhi8wbzPw .)

To see whether React is working properly, I'll use some debugging test code (source: 
https://www.copycat.dev/blog/reactjs-cdn/ )

I will try to convert the <script> tag that contains the link to all of this JS code to have 
the attribute "type/babel" so that I can use React. Since such <script> tag doesn't have an ID, I think
I'll have tu use querySelectorAll to get the tag. I will use setAttribute() in JS to add the "text/babel"
attribute (source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_setattribute1 .)
Then to select the <script> tag in the html files, I will use querySelectorAll("script") (source: 
https://www.w3schools.com/jsref/met_document_queryselectorall.asp .)

In the end, I ended up using just "querySelector" to select only one <script> tag, and I appended
the 3 CDN script tags afterwards so that only the first <script> tag got the "text/babel" attribute.

I was unable to use React for some reason. So, I won't use React.

Since I couldn’t get React to work, I will be creating the flash message using CSS and JS. At first, I will create on the head of the page an HTML 
element (like a <div>), which will contain the flash message. However, the message will be initially invisible. But, after clicking on the submit 
button on the compose page, I will temporarily make the message to be visible.

To add the div to the head of the initial HTML file, I will use the “.append()” function in JS. Then, I will add a property that will make the <div> 
to be invisible. To make the div invisible, I will use “display: none”. Then, to make it visible, I will use the “display: block” attribute.

*/
document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // This calls the send_mail() function when the user clicks on the submit button
  document.querySelector('#compose-form').addEventListener('submit', send_mail);

  // By default, load the inbox
  load_mailbox('inbox');

  // This will store the success message after the user sends an email
  let email_sent_successfully_message = document.createElement('p');

  // This adds an ID to the success message "p" tag
  email_sent_successfully_message.setAttribute("id", "email_sent_successfully_message");

  // This adds the text to the email confirmation message
  email_sent_successfully_message.innerHTML = 'Your email was successfully sent!'

  // This will store the email confirmation message on the <body> HTML tag
  document.body.appendChild(email_sent_successfully_message);

  // This makes the email success message to be invisible
  document.querySelector('#email_sent_successfully_message').style.display = 'none';

  // This will get the 1st <script> tag and add the "text/babel" attribute to it
  // document.querySelector("script").setAttribute("type", "text/babel");

  // This will load the 3 React CDNs to be able to use React
  // var react = document.createElement('script');
  // var reactDOM = document.createElement('script');  
  // var babel = document.createElement('script');

  // react.setAttribute('src','https://unpkg.com/react@17/umd/react.production.min.js');
  // reactDOM.setAttribute('src','https://unpkg.com/react-dom@17/umd/react-dom.production.min.js');
  // babel.setAttribute('src','https://unpkg.com/babel-standalone@6/babel.min.js');




  // document.head.appendChild(react);
  // document.head.appendChild(reactDOM);
  // document.head.appendChild(babel);

  // DEBUGGING: React test code:
  
});





function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

/* I will call the mailbox() function from here in order to obtain the proper name of the current mailbox in a variable */
function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Call the mailbox() function, and send the name of the current mailbox as a parameter
  display_mailbox_emails(mailbox)


  // mailbox()
}

/* Send mail function. This will get the data from the page for composing an email, 
and then send it into the databse. 

Since I’ll need to use an API to send the email, and I’ll need to get the data from some place, 
I’ll have to use the “fetch()” function. For the rest, I need to look at the send_mail() view in 
views.py to see how that function works. The views will be pretty much my API. So, I need to look at 
how the send_mail() function from the API works. Upon reading the vies.py file, I realize that there’s 
no “send_mail()” function. The closest thing to it seems to be a function called compose().

I’ll look at the compose() view, and see how to fetch data from it so that I can send an email.

After reading a bit more, turns ou that the compose() view displays the form that lets me write an 
email (like, type the person’s email, the actual email itself, and a title). Now, if the user clicks 
on “send”, the contents of this view need to be sent. So, one way or another, I need to use the 
compose() view. I need to get the data typed by the user on the form from the compose() view, and then 
send it to the database.

To send the email, for the time being, it’s enough to just submit the data from the “compose” form 
into the database. That is, by submitting the data from the inputs from the page that lets you 
compose an email, and creating an entry on the database, that’s enough. The question at hand is not 
asking me to let the recipient read that email, nor is it asking me to save that email on the “sent” 
mailbox.

So, I need to write JS code to get the data from the inputs from the “compose” form, and submit it to 
the database. The only inputs that I can get data from in the “compose” form are: the sender’s email 
address, the recipient’s email address, the title of the email, and the body of the email. I will 
get the data from those 4 inputs (or maybe 3, since it’s not urgent to get the sender’s email from 
  the “compose” form,) and save them as an entry in the database. 

In inbox.js, I think I’ll have to write a new function to let the user send an email. I could call it 
“send_mail()”.

To make a POST request when using the fetch() function to use the API, I need to add a second parameter
to the fetch() function, which is optional. I will specify that the HTTP request that I want to make
is a POST request. To do that, I need to use the snippet “let options = {method: ‘POST’}” (source: 
https://www.geeksforgeeks.org/javascript-fetch-method/ )

To get the data typed by the user on the inputs, and then convert that into JSON, I first need to use 
“let variable =  document.getElementByID(‘ID_of_the_input’).value;”. 
Then, I will use the fetch() function, specifying the route of the “emails” URL as the 1st parameter. 
Then, as the 2nd parameter, I need to specify the kind of content that will be converted into JSON. 
Here, I will specify that I want to do a POST request. Then, I will specify that I want to accept all 
kinds of text. Next, I will specify that I want to get content in JSON format. Then ,and this is the 
most important part, I will tell the fetch() function the keys for the “associative arrays” that I 
will create in JSON. Next, I will tell that those keys will have as values the inputs of the compose 
email form. Finally, I will create the JSON data. (Source of this entire paragraph: 
https://youtu.be/Oive66jrwBs )

For the variables, I will use the names “recipients”, “body”, and “subject”, since those are the 
names used in the compose() view.

Then, I need to redirect the user from the compose page to their inbox. To do that, I think I need 
to call the function that redirects the user to their sent mailbox at the end of the function that allows 
the user to compose an email. That way, the user should ideally be redirected to their inbox page 
right after sending an email.

For the confirmation message, I will use the setTimeout() function from Javascript to tell the flash message when to disappear after 
it appears (source: https://www.w3schools.com/jsref/met_win_settimeout.asp .) But, to make it work, I will create a new function that 
will make the flash message to disappear. Then, I would insert that function within the setTimeout() one, and make it execute after a 
number of seconds.

The function that will make the flash message to disappear will set the “display” CSS property of the flash message to “none”. 

*/
function send_mail(e) {  // "e" is for "event"
  e.preventDefault();

  // This gets the data from the compose page inputs
  let recipients = document.getElementById('compose-recipients').value;
  let subject = document.getElementById('compose-subject').value;
  let body = document.getElementById('compose-body').value;

  // This uses the API to send the mail data to the database (source: https://youtu.be/Oive66jrwBs). 
  fetch('/emails', {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type':'application/json'
      },
      body:JSON.stringify({recipients:recipients, subject:subject, body:body})                
  })
  .then((res) => res.json())  // This creates the JSON data
  .then((data) => console.log(data))

  // This redirects the user to their sent mailbox
  load_mailbox('sent')

  // This makes the email success message to become visible
  document.querySelector('#email_sent_successfully_message').style.display = 'block';

  // This will hide the flash message after a few seconds
  setTimeout(hide_flash_message, 4000);

} 

// This will hide any flash messages
function hide_flash_message() {
  document.querySelector('#email_sent_successfully_message').style.display = 'none';
}


