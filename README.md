
# MiniMinds Lab — Learning to Code Through Play 🧠

Welcome to **MiniMinds Lab** — a fresh and exciting web platform that empowers **children** to dive into the world of logic, **programming**, and **artificial intelligence** through fun, interactive games!  
Built using **Next.js** for the frontend, **FastAPI** for the backend, and enhanced by an **NLP-based AI module**, MiniMinds Lab introduces the next generation to computational thinking in a playful, personalized, and intuitive way.

---

## 🌟 What is MiniMinds Lab?

MiniMinds Lab is an educational web application crafted to:

- 🎯 Teach kids aged 6–12 fundamental programming and problem-solving skills.
- 🧠 Develop logical thinking and algorithmic reasoning through interactive logic games.
- ✨ Personalize learning experiences with an AI-driven feedback system that encourages kids based on their progress.

Our goal is simple:  
**Turn curiosity into creativity, and creativity into coding skills!** 🎮💻

---

## 🧩 Key Features

### 🎮 Interactive Learning Games
From puzzles to coding-based challenges, kids embark on playful adventures that sharpen their logic, pattern recognition, and algorithmic skills — all while having fun! 🎲🚀

### 🤖 AI-Powered Feedback
MiniMinds Lab integrates a smart AI module that monitors user progress and generates motivational tips and personalized encouragement — turning every small win into a big moment! 🧠💬

### 🎨 Kid-Friendly, Engaging UI
Designed with children in mind, our user interface is colorful, intuitive, and easy to navigate, making learning feel like play and exploration. 🖥️

### 📈 Adaptive Progress Tracking
Parents and educators can follow the child's learning journey, see their achievements, and identify areas where additional support might be helpful. 📊👩‍🏫

---

## 💡 Why MiniMinds Lab?

- 🎮 **Learn Through Play**: Programming concepts are transformed into fun, interactive games that make learning natural and enjoyable.
- 🤖 **Smart Personalized Feedback**: Our AI-powered system encourages kids with real-time motivational tips based on their progress.
- 🧠 **Build Essential Skills**: MiniMinds Lab develops logic, problem-solving, and computational thinking — critical abilities for the digital future.
- 🚀 **Accessible and Scalable**: Powered by Vercel and Fly.io, our platform is fast, reliable, and ready to support young learners everywhere.

---

## 🌍 Our Impact

- 🎮 Encourages early interest in programming by making abstract concepts tangible through interactive play.
- 🧩 Develops core skills like logical thinking, pattern recognition, and structured reasoning.
- 🚀 Empowers young learners to become tomorrow’s creative problem-solvers.

---

## 🚀 Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ImDeveloperz/minimindslab.git
cd MiniMindsLab
```

2. Set Up and Run the Backend "FastAPI"  
a. Create and activate a virtual environment:
```bash
cd backend
python -m venv venv
```
--Activation:  
On Windows:
```bash
venv\Scriptsctivate
```
On macOS/Linux:
```bash
source venv/bin/activate
```

b. Install the dependencies:
```bash
pip install -r requirements.txt
```

c. Run the FastAPI server:
```bash
uvicorn main:app --reload
```

3. Set Up and Run the Frontend "Next.js":
```bash
cd frontend
npm install
npm run dev
```

📘 **Usage Guide**

🏠 **Home Page Navigation**  
👥 **Contributor Credits**  
This project was developed by a passionate team of innovators. We thank everyone who contributed to making MiniMinds Lab a success:

- Yahya ERRAME – AI & Backend Developer
- Mohamed RIFAI – AI & Backend Developer
- Zakariae ZEMAT - Frontend Developer
- Zouhair TOUFANI - FullStack Developer
- Houda Oufares - DevOps Engineer

This is a Next.js project bootstrapped with create-next-app.

---

## API Endpoints

### POST /api/session/create
Create a new user session with a username and avatar.

### GET /api/session/{session_id}
Retrieve session information by session ID.

### POST /api/session/guest
Create a guest session with a random username and avatar.

### GET /api/stats
Get statistics about active sessions and avatar distribution.

### GET /api/health
Health check endpoint to verify the server is running.

### GET /api/{game_name}/levels
Get all levels for a specific game.

### GET /api/{game_name}/levels/{level_id}
Get a specific level by ID for a specific game.

### GET /api/cards
Retrieve all memory cards (Memory Card game).

### GET /api/feedback
Generate motivational feedback text based on difficulty, tries, and time (uses Pollinations AI).

### GET /api/pattern-builder
Retrieve all pattern builder game data.

### GET /api/pattern-builder/{difficulty}
Retrieve pattern builder game data for a specific difficulty level.

### GET /message/
Get an encouraging message based on problem difficulty, time taken, and attempts.

#### Parameters:
- difficulty: Problem difficulty ('easy', 'medium', 'hard' - case insensitive)
- time_taken: Time taken to solve (in seconds)
- attempts: Number of attempts made

Returns a JSON object containing the encouraging message.

### GET /cached-message/
Get a cached encouraging message based on problem difficulty, time taken, and attempts.

#### Parameters:
- difficulty: Problem difficulty ('easy', 'medium', 'hard' - case insensitive)
- time_taken: Time taken to solve (in seconds)
- attempts: Number of attempts made

Returns a JSON object containing the encouraging message.

### GET /all-messages/
Get all possible message templates organized by difficulty and speed.

Returns a JSON object containing all message templates.

---

## Frontend Deployment

The frontend is deployed on Vercel, making it fast, reliable, and ready to support young learners everywhere.

---

## Getting Started

First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.js. The page auto-updates as you edit the file.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!