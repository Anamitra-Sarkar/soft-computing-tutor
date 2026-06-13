# Soft Computing Mastery Tutor

An interactive study guide for university students covering Fuzzy Logic, Neural Networks, Genetic Algorithms, and Optimization techniques.

## Features
- **Interactive Visualizers:** Real-time simulations of Alpha-Cuts, Fuzzy Operations, Gradient Descent, PSO, and more.
- **Academic Theme:** Clean, textbook-inspired design with serif typography.
- **Study Assistant:** Interactive chat for explaining complex mathematical concepts.
- **Knowledge Checks:** Randomized quizzes with MCQ and Subjective evaluation.

## Deployment on Vercel
1. Push this repository to GitHub.
2. Connect the repository to Vercel.
3. In Vercel Project Settings, add an Environment Variable:
   - **Key:** `GROQ_API_KEY`
   - **Value:** Your Groq API Key (starts with `gsk_`)
4. Deploy! The build script will automatically inject the key into the application.

## Development
This project uses React and Tailwind via CDN for simplicity.
- `index.html`: Main entry point.
- `app.jsx`: Main application logic.
- `data.js`: Curriculum and quiz data.
