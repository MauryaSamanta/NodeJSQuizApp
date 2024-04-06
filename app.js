const express = require('express');
const bodyParser = require('body-parser');
const questions = require('./questions.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.post('/api/submit', (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;
  const results = [];

  questions.forEach((question, index) => {
    const correctAnswer = question.answer;
    const userAnswer = userAnswers[index];

    if (userAnswer === correctAnswer) {
      score++;
      results.push({ question: question.question, answer: userAnswer, correct: true });
    } else {
      results.push({ question: question.question, answer: userAnswer, correct: false, correctAnswer });
    }
  });

  res.json({ score, results });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
