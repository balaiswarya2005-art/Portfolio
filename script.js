/* ===============================
   SCROLLABLE FRAME ANIMATION
=================================*/

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let frameCount = 240;
let images = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for(let i=1;i<=frameCount;i++){
    const img = new Image();
    const number = String(i).padStart(3,'0');
    img.src = `frames/ezgif-frame-${number}.jpg`;
    images.push(img);
}

function updateFrame(){
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(frameCount-1, Math.floor(scrollFraction*frameCount));

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(images[frameIndex],0,0,canvas.width,canvas.height);
}

window.addEventListener("scroll",updateFrame);

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


/* ===============================
   GEMINI CHATBOT
=================================*/

// ⚠️ INSERT YOUR GOOGLE AI API KEY HERE
const API_KEY = "PASTE_YOUR_GOOGLE_AI_API_KEY_HERE";

const SYSTEM_PROMPT = `
You are a resume assistant chatbot.
STRICT RULES:
1. Only answer using the exact content from Bala Iswarya P's resume.
2. Do NOT add external knowledge.
3. If answer not found in resume, reply:
   "This information is not available in the resume."
4. Be concise and professional.

Resume Content:
Name: Bala Iswarya P
Location: Thoothukudi
DOB: August 16, 2005
Gender: Female
Degree: B.Tech ECE - Anna University - CGPA 8.1
Class XII: 90.5%
Class X: 100%
Internships: Emertex (Microwave Simulation MPLAB PICSimLab),
IPCS Global (PLC Automation)
Projects: Microwave Simulation, Smart Plant Monitoring,
Sustainable Packaging, AI Rockfall Prediction
Skills: Electronics, Digital Electronics, Digital Communication,
Electronic Circuits, Python, MPLAB, Proteus, PLC, MS Office
Languages: Tamil, English, Hindi
`;

async function sendMessage(){
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if(!message) return;

    const chatBox = document.getElementById("chat-messages");

    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    input.value="";

    try{
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                contents:[
                    {
                        parts:[
                            {text: SYSTEM_PROMPT + "\nUser Question: " + message}
                        ]
                    }
                ]
            }
        );

        const reply = response.data.candidates[0].content.parts[0].text;

        chatBox.innerHTML += `<div><strong>Bot:</strong> ${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    }catch(error){
        chatBox.innerHTML += `<div><strong>Bot:</strong> Error connecting to AI.</div>`;
    }
}
