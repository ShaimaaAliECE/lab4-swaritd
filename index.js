// Swarit Dholakia (sdholaki - 251107834) - se3316 - lab 4

const express = require('express');
const questions = require('./questions.json');

const thisquiz = express();

//Serve static content, post form data, handle JSON, parse JSON as string and then send as reponse

thisquiz.use(express.static("static"));

thisquiz.use(express.urlencoded({
        extended: true
    }));


thisquiz.use(express.json());

thisquiz.get("/questions", (req,res) =>
    {
        res.json(questions); 
    }
);

// format user choice, convert char from string to q and answer (2nd nad 4th), check and send JSON for right answers

thisquiz.post("/mark", (req,res) =>
    {
        const usrchc    = req.body["id"];  
        const q_num   = +usrchc[1]; 
        const a_num     = +usrchc[3];  
    
        let feedback =
            questions[q_num - 1]["answerIndex"] === a_num - 1
            ? "correct!" : "sorry, incorrect.";
            
        res.send(feedback);   
    }
);

// var to hold q JSON, array to hold right answers, var to hold grade (of right answers), and iterating over all questions and pushing right ones to array
thisquiz.post("/submit", (req,res) =>
    {
        const totalq = questions.length; 
        let correctans = [];              
        let grade   = 0;              
    
        questions.forEach((q) =>
            {
                correctans.push(q["answerIndex"]); 
            }
        );

//Loop over all questions, check if buttonclick answer is same as given right answer and adjust mark (or not)
        for(let i = 0; i<totalq; i++)
        {
            if(req.body[`q${i+1}`] === questions[i]["options"][correctans[i]])
                grade++;   
        }

        let content = `
            <div style = "  padding: 1rem
                            border-radius: 2rem;
                            background-colour: lightgray">

                <h2> Grade: </h2>
                <p>${grade}/${totQs}</p>
            <div>`;
    
        res.send(content);
    }
);

thisquiz.listen(80);   