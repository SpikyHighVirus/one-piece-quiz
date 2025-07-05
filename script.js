const questions = [
  {
    question: "What's your ideal way to spend free time?",
    options: [
      { text: "Training hard", character: "zoro" },
      { text: "Enjoying a good meal", character: "luffy" },
      { text: "Reading a book", character: "robin" },
      { text: "Inventing something cool", character: "franky" },
    ],
  },
  {
    question: "Which quality fits you best?",
    options: [
      { text: "Loyal and brave", character: "usopp" },
      { text: "Cool and calm", character: "sanji" },
      { text: "Sweet and caring", character: "chopper" },
    ],
  },
  {
    question: "Pick a favorite place:",
    options: [
      { text: "Sunny beach", character: "nami" },
      { text: "A haunted forest", character: "brook" },
      { text: "A bustling city", character: "franky" },
      { text: "A hidden library", character: "robin" },
    ],
  },
  {
    question: "Your weapon of choice?",
    options: [
      { text: "Swords", character: "zoro" },
      { text: "My fists!", character: "luffy" },
      { text: "Intelligence", character: "nami" },
      { text: "Slingshot", character: "usopp" },
    ],
  },
  {
    question: "Pick a drink:",
    options: [
      { text: "Milk", character: "chopper" },
      { text: "Espresso", character: "robin" },
      { text: "Cola", character: "franky" },
      { text: "Sake", character: "brook" },
    ],
  },
];

const results = {
  luffy: { name: "Luffy", image: "content/luffy.jpg", desc: "You're fearless, fun-loving, and always ready for adventure!" },
  zoro: { name: "Zoro", image: "content/zoro.jpg", desc: "You're disciplined, determined, and loyal to your crew." },
  nami: { name: "Nami", image: "content/nami.jpg", desc: "You're clever and resourceful with a great sense of direction… mostly." },
  sanji: { name: "Sanji", image: "content/sanji.jpg", desc: "Charming and strong — you fight with style and cook with heart." },
  robin: { name: "Robin", image: "content/robin.jpg", desc: "Wise, calm, and mysterious. You're the brain of the group." },
  chopper: { name: "Chopper", image: "content/chopper.jpg", desc: "You're kind, helpful, and often underestimated — but truly powerful." },
  franky: { name: "Franky", image: "content/franky.jpg", desc: "Bold, creative, and SUPER! You think outside the box." },
  brook: { name: "Brook", image: "content/brook.jpg", desc: "You’re fun, artistic, and always lighten the mood." },
  usopp: { name: "Usopp", image: "content/usopp.jpg", desc: "Creative and brave when it counts — you surprise everyone!" }
};

let current = 0;
let scores = {};
const popSound = document.getElementById("popSound");
const startContainer = document.getElementById("startContainer");

function showQuestion() {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.classList.remove("fade-out", "hidden");
  document.getElementById("resultContainer").classList.add("hidden");

  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      popSound.currentTime = 0;
      popSound.play();
      scores[opt.character] = (scores[opt.character] || 0) + 1;
      quizContainer.classList.add("fade-out");
      setTimeout(() => {
        current++;
        if (current < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      }, 400);
    };
    optionsDiv.appendChild(btn);
  });
}

function showResult() {
  const resultId = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const r = results[resultId];
  const resultContainer = document.getElementById("resultContainer");
  document.getElementById("quizContainer").classList.add("hidden");
  resultContainer.classList.remove("hidden");
  document.getElementById("resultName").textContent = r.name;
  document.getElementById("resultImage").src = r.image;
  document.getElementById("resultDesc").textContent = r.desc;
  fireConfetti();
}

function restartQuiz() {
  current = 0;
  scores = {};
  document.getElementById("resultContainer").classList.add("fade-out");
  setTimeout(() => {
    document.getElementById("resultContainer").classList.add("hidden");
    showQuestion();
  }, 400);
}

function startQuiz() {
  startContainer.classList.add("fade-out");
  setTimeout(() => {
    startContainer.classList.add("hidden");
    showQuestion();
  }, 400);
}

function fireConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(draw);
  }

  draw();
  setTimeout(() => (canvas.width = canvas.height = 0), 4000);
}

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    // Quiz starts only after user clicks start
  }, 1000);
};
