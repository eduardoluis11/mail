/* Global variable that keeps track of the current mailbox */
var current_mailbox = ''

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

I will try to print the JSON data into the website, since I'm getting the JSON object, but I'm unable to print it.
I will use code from Brian's "Javascript" lecture to print the data for debugging purposes 
(source: https://youtu.be/x5trGVMKTdY .)

For debugging purposes, I will use a “for” loop to iterate every element of the array that contains 
all of the JSON data with all of the emails. Source of the “for” loop code snippet: 
https://www.w3schools.com/js/tryit.asp?filename=tryjs_loop_for .

BUG: emails are appearing below the compose form in the compose page. If I come from the “sent” mailbox, all of the sent emails will show up in the 
compose page. Meanwhile, if I come from the “inbox” page, all of the inbox emails will show up in the compose page.
	
A possible solution would be to give the CSS property of “display none” to the div that contains all of the emails whenever the compose page is 
currently selected. The compose page is the selected page whenever the compose_page() function is being executed. The emails are contained in the 
div with ID “mailbox_email_container”.
	
So, if I change the “display” property to “none” to the “mailbox_email_container” div whenever the compose_page() function is being executed, I 
can make the emails disappear whenever I enter the compose page. Of course, I need to make the emails visible whenever I enter any of the mailboxes. 
So, I can make the “display” property to be “block” whenever I use the API for fetching the mailbox emails.

The JSON data in the console tells me the keywords that I need to use to get each piece of data. For instance, if I want the email of the sender, 
I need to use the keyword "sender", since that's the variable that stores the sender's email according to the JSON data.

I will add Bootstrap classes to the divs that contain each individual email to separate the timestamp from the email title. I will do that since, 
currently, the subject and the timestamp are too close to each other, so the title of each email is difficult to read. So, I will use a Bootstrap 
grid. The grid will be of 1 row and 2 columns. In the 1st column, I will add the sender’s email address and the subject. Then, in the 2nd column, 
I will print the timestamp. Source of the Bootstrap code snippet: https://getbootstrap.com/docs/4.4/layout/grid/ 

I will create a variable that will store the words “white” or “gray”, depending on whether the email has been read or not. I’ll put an if 
statement that checks the “read” property of the current JSON item. If it’s “true”, the variable will be set to “gray”. Otherwise, it will 
be set to white. Then, I will insert that variable inside of the HTML code that I’m generating. I will add a “style: background-color” attribute 
to the div with the “row” class. That background-color will be equal to the variable that changes between white or gray. Source of the code 
snippet for using "if" statements in JS: https://www.w3schools.com/js/js_if_else.asp

Source of the shade of gray that I'm using for the emails: https://www.w3schools.com/colors/colors_shades.asp

I will make the whole div that contains an individual email to be clickable. So, the best place to place the onclick() event would be on the div 
with the “row” class.

Or, I could add an ID to every individual email in the “for” loop. The ID would be the email’s ID from the JSON data. Then, I could select that 
specific email when the user clicks it by using a querySelector or a getElementByID, and I would select the email with the ID of the current 
iteration of the emails array. This should all be done in the display_email_messages() function, since it’s where I have the name of the 
variables that I need to access. I would use a snippet like the following:

document.querySelector(`#${emails_array.id}`).addEventListener('click', () => view_email(emails_array.id));

My previous method is giving me bugs, so I won’t be able to activate the view_email() function that way. So, I will add the onclick() even 
inline while I’m creating each div for each email in the “for” loop. The snippet that I will add en each email div will be 
onclick="function(email_id)". 
Source of the snippet: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onclick .

*/
function display_mailbox_emails(mailbox) {

  // DEBUGGING message: this displays the current mailbox
  // console.log(mailbox)
  
  // console.log("Hello world")
  
  // This gets the emails in JSON format
  fetch(`/emails/${mailbox}`)
  .then((res) => res.json())
  .then((data) => {

    // DEBUGGING message
    console.log(data);
    
    // DEBUGGING message: This will print the JSON data into the website
    // const all_emails = data[0].id;
    // const all_emails = data[4].subject;
    // document.querySelector('body').innerHTML = all_emails;

    // This stores all the emails in an array
    const all_emails_array = data;

    // This stores all the emails in string format
    let all_emails = "";

    // This iterates over all the emails, and stores them as strings in a variable
    for (let i = 0; i < all_emails_array.length; i++) {

      // This will determine whether to set an email's background color to white or gray
      let email_color = '';

      // This sets the emails color depending on whether they've been read or not
      if (all_emails_array[i].read == true) {
        email_color = "#C8C8C8";
      }
      else {
        email_color = "white";
      }

      // This generates the HTML code for each email
      all_emails += `
        <div id="${all_emails_array[i].id}" class="row individual_email" style="background-color: ${email_color};" 
        onclick="view_email(${all_emails_array[i].id})">
          <div class="col-sm">
            <b>${all_emails_array[i].sender}</b> ${all_emails_array[i].subject}
          </div>
          <div class="col-sm">
            ${all_emails_array[i].timestamp} 
          </div>
        </div>
      `;

      // This sends the user to the view_email() function if the user clicks on an email
      // document.getElementById(`${all_emails_array[i].id}`).addEventListener('click', () => view_email(all_emails_array[i].id));

    }

    // This prints all the emails
    document.getElementById('mailbox_email_container').innerHTML = all_emails;

    // This turns the emails back to visible after exiting the compose page
    document.getElementById('mailbox_email_container').style.display = 'block';

    // This hides the selected email <div>
    document.getElementById('selected_email_container').style.display = 'none';


    // document.querySelector('body').innerHTML = all_emails;



  //     let emails = '';
  //     data.forEach(function(email){
  //       emails += `
  //           <ul>
  //               <li>ID: ${email.id}</li>
  //               <li>Body: ${email.body}</li>
  //           </ul>
  //       `;
  //     });
  //     document.getElementByID('email_sent_successfully_message').innerHTML = emails;
  })
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

I will now create an element (be it a <div> or a <p>), which will store all of the email titles from the JSON data.

To fix the margins so that the emails are aligned with the navbar and the website’s header, I will add the “container” class to the div that contains 
all of the emails. This works since “container” is a Bootstrap class. Also, if I add the borders after adding the correct margins, the vertical 
borders won’t be touching the browser’s margins, so they will be visible and look perfect.

I will go back to the DocumentOnLoaded() function, and I will create a new div. That div will contain the text from the selected email. This 
way, I won’t have to overwrite all of the HTML from the div that displays all of the emails of the mailboxes. 

I’m having trouble hiding the selected email once I change pages. What I could do is create a conditional that says that if the function that 
displays the selected email is being executed, to display the div of the selected email. Otherwise, that div should be hidden. I could make a 
“global” conditional, or insert a conditional inside of the DocumentOnLoaded() function. Then, I will say “if view_email() is true, then hide 
the div with the selected email” (source: Leo’s question from 
https://stackoverflow.com/questions/44912898/how-to-check-if-functions-have-been-executed .)

I will store the archive button inside of the container that renders the body of an individual email. This way, I would get the correct 
margins, and it would initially hide the button. To do that, I will use appendChild(), and specify that I want to append the button to the div 
that prints the body of an email (source: https://www.w3schools.com/jsref/met_node_appendchild.asp .)

*/
document.addEventListener('DOMContentLoaded', function() {

  // This creates the <div> that will contain an individual email if the user clicks on it 
  let selected_email_container = document.createElement('div');
  selected_email_container.setAttribute("id", "selected_email_container");
  selected_email_container.setAttribute("class", "container");
  document.body.appendChild(selected_email_container);

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

  // This fixes the email message's margins
  email_sent_successfully_message.setAttribute("class", "container");

  // This adds the text to the email confirmation message
  email_sent_successfully_message.innerHTML = 'Your email was successfully sent!'

  // This will store the email confirmation message on the <body> HTML tag
  document.body.appendChild(email_sent_successfully_message);

  // This makes the email success message to be invisible
  document.querySelector('#email_sent_successfully_message').style.display = 'none';

  // This is a message that will tell the user to wait for their email to be loaded in Sent
  let wait_for_email_message = document.createElement('p');
  wait_for_email_message.setAttribute("id", "wait_for_email_message");
  wait_for_email_message.setAttribute("class", "container");
  wait_for_email_message.innerHTML = 'Your email will be loaded below in a few seconds...'
  document.body.appendChild(wait_for_email_message);
  document.querySelector('#wait_for_email_message').style.display = 'none';



  // This creates the element that stores the email titles 
  let mailbox_email_container = document.createElement('div');

  // This adds an ID to the mailbox email container <div>
  mailbox_email_container.setAttribute("id", "mailbox_email_container");

  // This Bootstrap class will fix the margins for the container that contains the emails
  mailbox_email_container.setAttribute("class", "container");

  // This will store the mailbox email container on the <body> HTML tag
  document.body.appendChild(mailbox_email_container);

  // This creates the "archive" button ...
  // let archive_button = document.createElement('button');
  // archive_button.setAttribute("id", "archive_button");
  // archive_button.setAttribute("class", "btn btn-primary");
  // document.getElementById('mailbox_email_container').appendChild(archive_button);


  // This will show the selected email div if the click on it
  // if (view_email(e) == true) {
  //   document.getElementById('selected_email_container').style.display = 'block';
  // }

  //This will hide the div if the user clicks on another page
  // else {
  //   document.getElementById('selected_email_container').style.display = 'none';
  // }

  // The div with the selected email should be hidden unless the user clicks on any email 
  // document.getElementById('selected_email_container').style.display = 'none';


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




/* This renders the compose page. 

I will hide all the emails whenever a user enters the compose mail page. 

*/
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // This make the emails disappear from the compose page
  document.getElementById('mailbox_email_container').style.display = 'none';

  // This hides the selected email div
  document.getElementById('selected_email_container').style.display = 'none';
}

/* I will call the mailbox() function from here in order to obtain the proper name of the current mailbox in a variable.

I will modify the global variable that keeps track of the current mailbox in here. 

*/
function load_mailbox(mailbox) {

  // This stores the current mailbox in which the user is located
  current_mailbox = mailbox;

  // DEBUGGING message: this shows the name of the current mailbox
  console.log(current_mailbox);
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Call the mailbox() function, and send the name of the current mailbox as a parameter
  display_mailbox_emails(mailbox)

  // This hides the selected email div
  // document.getElementById('selected_email_container').style.display = 'none';
  


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

BUG: If I enter from the Sent mailbox to the email composition page, and the send an email, I will be sent to the Sent mailbox, but the email that 
was recently sent won’t show up until I reload the page.

Just like when archiving emails, I will reload the page after sending the user to whatever page that they need to go after sending an email. That 
way, the page will be reloaded after sending an email, and the sent email will show up on the Sent mailbox. However, if I reload the page, I will 
be automatically be taken to the inbox, NOT necessarily to the previous page where the user was in before composing an email.
	
Let me re-read the assignment to see if I need to redirect the user to a specific page after sending an email, or if I can redirect them to 
wherever I want to. 
	
Turns out that I need to redirect users to the Sent mailbox right after sending any email. And the problem of reloading the page is that I would 
send users to their inbox. Let’s see what I can do.

BUG FIX: If I reload the Sent mailbox after a timer runs out, such as the timer for the email confirmation flash message, the Sent page gets 
reloaded, and the sent email shows up. 

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

  // load_mailbox('sent')

  // This will reload the page, and then redirect users once again to the sent mailbox
  // document.location.reload()
  // load_mailbox('sent')

  // This will reload the page after 1 second
  // setTimeout(load_mailbox('sent'), 1000);

  // This makes the email success message to become visible
  document.querySelector('#email_sent_successfully_message').style.display = 'block';

  // This will tell the user to wait until their sent email appears in Sent
  document.querySelector('#wait_for_email_message').style.display = 'block';

  // This will hide the flash message after a few seconds
  setTimeout(hide_flash_message, 4000);

} 

// This will hide any flash messages after a few seconds
function hide_flash_message() {
  document.querySelector('#email_sent_successfully_message').style.display = 'none';

  // This makes the wait message to disappear
  document.querySelector('#wait_for_email_message').style.display = 'none';

  // This reloads the page to make the sent email appear on the Sent mailbox
  load_mailbox('sent')
  
  // setTimeout(load_mailbox('sent'), 1000);
}

/* This renders the emails that gets clicked by the user.

Since I need to use the API again to make a GET request using fetch(), I will need to probably make another fetch() function. I will create a 
new separate function. Then, from the display_mailbox_emails() function, I will send the user to the new function that I will create. However, 
to open the correct email (the one that I click,) I will get the ID of that email, and I will send it to the new function as a parameter. 
For instance, I can put an onclick() event in which, if the user clicks on the email, they will activate a function called 
“view_email($(email_variable.id)).”

That way, I will send the user to the function that displays that email, and the parameter will tell the web app which email to render.

Now, I will create the fetch() function for the view_email() function. This fetch() function will go to the “/emails/email_id” route. The email 
ID will be the email_id parameter that I’m getting from the display_mailbox_emails(). That fetch() function will give me JSON data. Then, I will 
try to print some of that JSON data to check if I’m getting the email data correctly.
	
If it works, I can just rewrite the entire HTML code within the container that displays all of the emails of any inbox. That way, all of the 
emails will disappear, and only the selected email will be printed onscreen.

At first, I will print the email’s sender, recipients, subject, timestamp, and body with a rough format just to check that I’m properly 
getting the data.

I will have to hide the “Sent” and “Inbox” titles whenever I click on an email.

Then, in the view_email() function, I will add the HTML code from the selected email to that div, and make that div visible. Then, if the user 
exits the page, I will hide that div, and show the divs with all of the emails from the mailboxes, or the compose page, depending on the page 
that the user enters. Remember to show or hide the titles (the <h1> or <h2> tags), depending on the page. 

Now, I need to hide the emails and the titles (<h3>) from the mailboxes whenever I click on an email. Then, if I reenter the mailboxes, I need 
to re-render the <h3> titles and the emails. The <h3> titles don’t have an ID. So, I will select all <h3> tags, and I will hide them whenever 
I click on an email.

To mark the email as read, it will be similar to the POST request that I did for one of the previous questions. The main difference is that, 
instead of POST, I will use a PUT request. Also, the only column that I will be modifying will be “read”, which I will turn into “true”. This 
will be only for emails in the “inbox” mailbox. So, it would be best to use a conditional. For that, I think I could put a condition that 
says that, if the selected email’s “read” attribute is false, that I will change it to true via a PUT request and a fetch() function.

Now, I will create a variable that will only activate if the user opens an email from the inbox or the archive mailbox. So, I will need to 
return to the function that opens individual emails (view_email(), ) create that variable, and create a debug message that will only appear if 
the user opens an email on the inbox or archived mailboxes.
	
To do this, I’ll put an “if” statement. I’ll use an if statement to check whether the user is located on the inbox or archive mailbox inside of 
the fetch() function that displays the individual email. If the condition checks, I will display the debug message. 

Now, I can render the “archive” button. That button will be rendered in the same “if” statement that contains the debug message that tells
me that I’m opening an email from the inbox or the archived mailbox.

But first, I need to create an HTML element that will store the “archive” and “unarchive” buttons. That can be done on the DocumentOnLoaded() 
function. Then I will modify the CSS of those buttons whenever the user opens an inbox or archived email, which can be done on the view_email() 
function.

In the HTML code of the view_email() function with the back ticks, I can create the “archive” button. There’s no need to do this on the 
DOMOnLoaded() function. I will render the button on top of the emails, since that's more or less how archive buttons are rendered on Gmail 
emails. 

I will initially leave the text empty of the archive button. I will load the text of the button to display “archive” or “unarchive” depending 
on whether its “archived” status is “true” or “false” in the JSON data. Also, whenever I render “sent” emails, I will hide the button by setting 
its “display” property to “none” by using an getElementByID and an “if” statement.

For the time being, I will let the user reply to all emails, including emails on the “sent” mailbox. Since nowhere in the assignment says that 
users should be prevented from replying to their own emails, and since preventing users from replying to emails on the “sent” mailbox could cause 
bugs in my code, I will let users reply to any email.
	
So, to add the reply button, I will go back to the view_email() function, and, in the variable that generates the HTML code, I will add a button 
with the name “Reply”. I will need to add an event listener to it later.

I added an <hr> tag to add a line that separates the head info of the email from its body (source: https://www.w3schools.com/tags/tag_hr.asp .)

To properly get the email in the event listener for the reply() button, I needed to plug in the sender's email between quotation marks.

Now, I need to plug in the timestamp and the body of the email in the reply() button.

Using "&quot" as quotation marks is helping me fix a bug whenever I try to reply to an email multiple times 
(source: tsemer's reply on https://stackoverflow.com/questions/2004168/escape-quotes-in-javascript .)

B

*/
function view_email(email_id) {

  // DEBUGGING message: this detects if I'm getting the email ID from the mailbox() function
  console.log(email_id)

    // This gets the selected email in JSON format
    fetch(`/emails/${email_id}`)
    .then((res) => res.json())
    .then((data) => {

      // DEBUGGING message: this should display the selected email in JSON format
      console.log(data);

      // This contains the selected email in JSON format
      let selected_email = data;
      let sender = selected_email.sender;
      let subject = selected_email.subject;
      let body = selected_email.body;
      let timestamp = selected_email.timestamp;


      // This removes the line breaks in the body (source: https://bobbyhadz.com/blog/javascript-remove-all-line-breaks-from-string )
      let body_sanitized = body.replace(/[\r\n]/gm, '');

      // (source: bobince's reply on https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript)
      // let body_sanitized = body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

      // (source: coolaj86's reply on https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex)
      // let body_sanitized = body.replace(/\$/g, '$$$$');

  
      // This creates the HTML code that will print the selected email
      let email_in_string_format = `
        <div id="${selected_email.id}">

          <button id="archive_button" class="btn btn-primary" 
          onclick="archive_and_unarchive(${selected_email.id}, ${selected_email.archived});"></button>

          <p>From: ${selected_email.sender}</p> 
          <p>To: ${selected_email.recipients}</p> 
          <p>Subject: ${selected_email.subject}</p>
          <p>Timestamp: ${selected_email.timestamp}</p>
          <button id="reply_button" class="btn btn-sm btn-outline-primary" 
          onclick="reply('${sender}', '${subject}', '${timestamp}', &quot;${body_sanitized}&quot;)">
            Reply
          </button>
          <hr>

          <p>${selected_email.body}</p>

        </div>
      `;


      // This prints the selected email
      document.getElementById('selected_email_container').innerHTML = email_in_string_format;

      // This makes the selected email div to become visible
      document.getElementById('selected_email_container').style.display = 'block';

      // This hides the rest of the emails
      document.getElementById('mailbox_email_container').style.display = 'none';

      // This will hide the "Inbox" title
      document.querySelector('#emails-view').style.display = 'none';

      // This detects whether the email is from the inbox, and if it is unread
      if (selected_email.read == false) {

        // This PUT request will mark the email as read
        fetch(`/emails/${email_id}`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type':'application/json'
          },
          body:JSON.stringify({read:true})                
        })
        // .then((res) => res.json())  // This creates the JSON data
        // .then((data) => console.log(data))

      }

      // document.querySelectorAll('h3').style.display = 'none';
  
      // This shows up if the user opens an email from the inbox or the archive mailbox
      if (current_mailbox == "inbox" || current_mailbox == "archive") {

        // DEBUG MESSAGE
        console.log("You just opened an email from the inbox or the archive mailbox.");

        // This will make the archive button visible
        document.getElementById('archive_button').style.display = 'block';

        // This checks if the email is archived on the database
        if (selected_email.archived == false) {
          // This names the button "Archive"
          document.getElementById('archive_button').innerHTML = 'Archive';
        }

        // If the email is already archived, the button will be named "Unarchive"
        else {
          document.getElementById('archive_button').innerHTML = 'Unarchive';
        }


      }
      // This will hide the archive button
      else {
        document.getElementById('archive_button').style.display = 'none';
      }

    })
}

/* This will archive emails.

Only the inbox emails can be archived. So, I will put the “archive” button whenever I open an email. I will make it disappear of I exit the 
selected email. Sent emails should NOT display the archive button. To do this, I will look at the function that activates the inbox page, and, 
from there, I will make a call to a function that archives emails. However, the button should appear only when I open an inbox email, not when 
I’m displaying all of the inbox emails.

I will style the archive button using Bootstrap.

I need to know how to differentiate inbox emails from sent emails. This way, I will only render the archive button when viewing an individual 
email, but only for inbox emails.

After reading the views, I remember that I’m storing the name of the mailbox in a variable called “mailbox”. That way, I can differentiate 
between being on the inbox from being on the sent mailbox.

The emails in the “archived” mailbox will technically also have the “archive” button, but instead of “archive”, it will be called “unarchive”. 
Or, I will toggle between the “archive” and “unarchive” buttons whenever I click them on either the inbox or the archived mailbox, just like I 
did with the watchlist button in the commerce project assignment. 

To keep track of the current mailbox that I’m currently in, I could create a global variable. I could create a variable outside of any function 
so that it works as a global variable. And I would declare it using “var”, not “let”. Then, to modify it, I would go into the load_mailbox() 
function. To do that, I would make its parameter, the “mailbox” variable, equal to the global variable. That way, the global variable would now 
the current mailbox in which the users are currently located.

Archiving an email will be quite similar to what I did in a previous question to use a PUT request to mark an email as read. The difference will be that, 
instead of modifying the “read” column, I will be modifying the “archived” one from the JSON data of the selected email.

I could insert a parameter to it to determine whether to archive or unarchive the selected email. In fact, I need the email's ID as a parameter.
So, I could insert 2 parameters to this function: one for getting the email ID, and another for deciding on whether to archive or unarchive the
email.

I will need to put an if statement to decide on whether to use the fetch() function to archive or to unarchive an email. 

I’ll just call the load_inbox() function, and I’ll insert “inbox” as a parameter to load the user’s inbox.

BUG: After archiving or unarchiving an email, I need to reload the page in order to see the email getting archived or unarchived.

BUG FIX: If I refresh the page, I will go back to the inbox anyways. Remember that the 1st page that gets loaded in the DOMContentLoaded is the 
inbox page. Also, if I refresh the page. 

If I can somehow refresh the page right after archiving or unarchiving an email, I could kill 2 birds with 1 stone: I could show the email being 
archived and fix the bug, and I could load the user’s inbox.

To reload the page using JS, I need to use the function “document.location.reload()” (source: 
https://www.quackit.com/javascript/javascript_refresh_page.cfm .) Now, to archive or unarchive an email in the database, and then reload 
the page so that the changes are visible, I will have to first load the inbox, and the I will have to reload the page using JS.

*/
function archive_and_unarchive(email_id, isArchived) {
  
  // DEBUG message
  console.log("This is the archive function.")

  // This will check if the email is archived or not
  if (isArchived == false) {

    // This will archive an email
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type':'application/json'
      },
      body:JSON.stringify({archived:true})                
    })
  }
  else {

    // This will unarchive an email
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type':'application/json'
      },
      body:JSON.stringify({archived:false})                
    })
  }

  // This loads the user's inbox
  load_mailbox('inbox');
  document.location.reload()

  

}

/* Reply function. 

To take the user to the email composition form, I simply have to call the function that loads the compose page. So, I would need to 
call the compose_email() function.
	
Also, I need to create a function for the reply feature. That’s where the code for the reply function will lie. I will simply call it 
reply().
	
Then, I will add an event listener to the reply button to call the reply() function.

First, I want to make sure that, after calling the view_email() function in the reply function, if I can keep doing stuff in the reply() 
function. 

If I can, I will edit the input where the use can type the recipient of the email (the “To:” input). That input should be pre-filled with 
the email address of the person who sent the original email (the one that I’m replying to.)  This can be done by editing the inner HTML of 
the “To:” input. That input has an ID called “compose-recipients.”

I need to get as a parameter the email address of the person who sent the email. That can be done in the view_email() function. I will 
plug in in the reply button’s event listener the email’s sender as a parameter. I will get the email’s sender from the JSON data. Also, 
the reply() function should accept at least 1 parameter.

One of the problems I’m having while pre-filling the inputs is that I need to modify the “value” attribute of the inputs.

To detect if the email starts with the word “Re: ”, I will need to use the includes() function to find “Re: ” as a substring of the
email’s subject(source: https://thispointer.com/javascript-check-if-string-contains-substring/ .) If I find that substring, I will not 
add “Re: ” at the beginning of the subject. Otherwise, I will add it to the subject.

BUG 1: I can’t reply to emails that have more than 1 recipient. If I click on reply, nothing happens, and I get a message saying: “Uncaught 
SyntaxError: missing ) after argument list”.

BUG 2: if I try to reply to an email that already had a reply, I can’t send the email either. I get an error saying “Uncaught SyntaxError: '' 
string literal contains an unescaped line break”.

To try to fix the 2nd bug, I could try to escape the quotation marks in the reply button, in the part where I’m plugging in the body of the email. 
To escape characters in JS, I need to use a backslash before the quotation marks (source: 
https://www.geeksforgeeks.org/how-to-use-escape-characters-to-correctly-log-quotes-in-a-string-using-javascript/ .)

BUG 2 FIX: I removed all of the line breaks using a replace() function, and a regular expression that removes all line breaks (source of the 
regular expression: https://bobbyhadz.com/blog/javascript-remove-all-line-breaks-from-string .) Also, I needed to enclose the $(‘body’) 
variable (where I’m pluggin in the body of the original email) in the reply() button by using “&quot” instead of quotation marks (source: 
tsemer's reply on https://stackoverflow.com/questions/2004168/escape-quotes-in-javascript ). 

NOTE: Bug 2 is not 100% fixed, since, if the user types in any double quotes on an email, or the "&quot;" symbol nobody will be able to reply 
to that email, since there will be escaping problems once again. I need to remove the quotation marks escaping them by using a regular expression.
	
I used some regular expressions, but the failed. Source of the 1st regular expression that failed: bobince's reply from 
https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript . Source of the 2nd regular 
expression that failed: coolaj86's reply on https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex .

BUG 1 FIX: By fixing bug 2. Bug 1 got automatically fixed. I can already reply emails from more than 1 recipient. It seems that removing the 
line breaks and enclosing the “body” variable in the reply() button between “&quot” marks fixed this bug as well. Just remember to avoid 
typing double quotation marks in any emails. 

*/
function reply(sender, subject, timestamp, body) {

  // This loads the page for composing emails
  compose_email();

  // DEBUG message: this tells me whether I'm still executing the reply() function
  console.log("You're still inside of the reply() function.");

  // This pre-fills the recipients input with the email address of the person who sent the original email
  document.getElementById("compose-recipients").value = sender;

  // This wil pre-fill the body of the email 
  document.getElementById("compose-body").value = `
    On ${timestamp}, ${sender} wrote: \n
    ${body}
  `;

  // This checks if the subject starts with "Re: "
  if (subject.includes('Re: ')) {

    // This pre-fills the subject without the "Re: "
    document.getElementById("compose-subject").value = subject;
  }
  else {

    // If it doesn't start with "Re: ", I will add it to the subject
    document.getElementById("compose-subject").value = `Re: ${subject}`;
  }


  // document.getElementById("compose-recipients").innerHTML = sender[0];
  
}


