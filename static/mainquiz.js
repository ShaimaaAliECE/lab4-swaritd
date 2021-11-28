// Swarit Dholakia (sdholaki - 251107834) - se3316 - lab 4

let htmlreq = new XMLHttpRequest();

htmlreq.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 20)
    {

// get q from server, execute when doc is ready to go, loop iterates through every q and over answer options

        let questions = JSON.parse(this.responseText);  //Get questions from server
        //Executes when document is ready
        $(document).ready(function()
        {
            let allcontent = `<form action ="/submit" method ="post">`;

            for (const [x,y] of questions.entries())
            {   
                allcontent += `
                <div    id      = "question${x+1}"
                        style   =  "margin: 0.5rem 0;
                                    padding: 0.5 rem;">
                <p><b>${i+1}. ${y.stem}</b></p>`;

                for (const [counter, choice] of y.options.entries())
                {
                    //Adding radio button + label for each answer option
                    allcontent +=  `
                    <input  type    = "radio"
                            value   = "${choice}"
                            name    = "q${x+1}"
                            id      = "q${x+1}a${counter+1}"
                            required>
                    <label  for     = "q${x+1}a${counter+1}">${choice}</label>
                    <br>
                    `;
                }
            }
            
// submitting, setting quiz to html, recognizing change in buttons and check, new post request

            allcontent += 
                    `<button style   = "margin-top: 1rem">Submit</button>
                    </form>`;

            $("#quiz").html(allcontent);

            $(`input[type="radio"]`).change(function()
            {

                if ($(this).is(":checked"))
                {
                    let clicked = this;
                    let answerRequest = new XMLHttpRequest(); 
                    answerRequest.onreadystatechange = function()
                    {
// var holding response gets checked and user is alerted of right/wrong

                        if(this.readyState == 4 && this.status == 200)
                        {
                            let fb = this.responseText; 
                            alert(fb);                  
                        }
                    };

//object holding buttonclick, converting it to JSON, then POSTing and sending JSON in said request

                    let clickedObject =
                    {
                        id: clicked.id,
                    };

                    let jsonClicked = JSON.stringify(clickedObject);

                    answerRequest.open("POST", "/mark", true);
                    answerRequest.setRequestHeader("Content-Type", "application/json");

                    answerRequest.send(jsonClicked);
                }
            }); 
        });
    }
};

// Asynchronously gets /questions and sending XMLHTTPRequest
htmlreq.open("GET", "/questions", true);   
htmlreq.send();                            