const questionBlocks = document.querySelectorAll('.question-block:not(.final-question)');
const finalQuestion = document.querySelector('.question-block.final-question');
const finalInput = finalQuestion?.querySelector('.answer-input');
const finalReveal = finalQuestion?.querySelector('.reveal-text');
const finalStatus = finalQuestion?.querySelector('.final-status');
const finalQuestionButton = document.querySelector('.final-question-button');
const returnButton = document.querySelector('.return-button');
const sequenceLabel = document.querySelector('.input-sequence');
const linkStatus = document.querySelector('.link-status');
const totalQuestions = questionBlocks.length;
let finalQuestionVisible = false;
let finalAnswerCorrect = false;

function updateLinkStatus(isComplete) {
  if (!linkStatus) return;

  linkStatus.classList.toggle('secured', finalAnswerCorrect);
  linkStatus.classList.toggle('pending', isComplete && !finalAnswerCorrect);
  linkStatus.classList.toggle('establishing', !isComplete && !finalAnswerCorrect);
  linkStatus.textContent = finalAnswerCorrect
    ? 'SECURED LINK ESTABLISHED'
    : isComplete
    ? 'PENDING SECURED LINK'
    : 'ESTABLISHING SECURED LINK';
}

function refreshSequenceCount() {
  const correctCount = document.querySelectorAll('.question-block:not(.final-question) .answer-input.correct').length;
  if (sequenceLabel) {
    sequenceLabel.textContent = `Layers breached: ${correctCount}/${totalQuestions}`;
    sequenceLabel.classList.toggle('complete', correctCount === totalQuestions);
  }

  const isComplete = correctCount === totalQuestions;
  updateLinkStatus(isComplete);

  if (finalQuestion) {
    questionBlocks.forEach((block) => block.classList.toggle('hidden', finalQuestionVisible));
    finalQuestion.classList.toggle('hidden', !finalQuestionVisible);
    returnButton?.classList.toggle('hidden', !finalQuestionVisible);
    finalQuestionButton?.classList.toggle('hidden', correctCount !== totalQuestions || finalQuestionVisible);
  }
}

questionBlocks.forEach((block) => {
  const input = block.querySelector('.answer-input');
  const reveal = block.querySelector('.reveal-text');
  const targets = block.dataset.answer?.split(',').map((answer) => answer.trim().toLowerCase()).filter(Boolean) || [];

  input.addEventListener('input', () => {
    const value = input.value.trim().toLowerCase();
    const isCorrect = targets.includes(value) && value !== '';

    input.classList.toggle('correct', isCorrect);
    input.classList.toggle('incorrect', value !== '' && !isCorrect);
    reveal.classList.toggle('visible', isCorrect);
    refreshSequenceCount();
  });
});

if (finalQuestion && finalInput && finalReveal) {
  const targets = finalQuestion.dataset.answer?.split(',').map((answer) => answer.trim().toLowerCase()).filter(Boolean) || [];
  finalInput.addEventListener('input', () => {
    const value = finalInput.value.trim().toLowerCase();
    const isCorrect = targets.includes(value) && value !== '';

    finalAnswerCorrect = isCorrect;
    finalInput.classList.toggle('correct', isCorrect);
    finalInput.classList.toggle('incorrect', value !== '' && !isCorrect);
    finalReveal.classList.toggle('visible', isCorrect);
    finalStatus?.classList.toggle('hidden', !isCorrect);
    refreshSequenceCount();
  });
}

finalQuestionButton?.addEventListener('click', () => {
  finalQuestionVisible = true;
  refreshSequenceCount();
});

returnButton?.addEventListener('click', () => {
  finalQuestionVisible = false;
  finalAnswerCorrect = false;
  finalStatus?.classList.add('hidden');
  finalInput?.classList.remove('correct', 'incorrect');
  finalReveal?.classList.remove('visible');
  refreshSequenceCount();
});

refreshSequenceCount();
