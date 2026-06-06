const questionBlocks = document.querySelectorAll('.question-block');
const sequenceLabel = document.querySelector('.input-sequence');
const totalQuestions = questionBlocks.length;

function refreshSequenceCount() {
  const correctCount = document.querySelectorAll('.answer-input.correct').length;
  if (sequenceLabel) {
    sequenceLabel.textContent = `Layers breached: ${correctCount}/${totalQuestions}`;
  }
}

questionBlocks.forEach((block) => {
  const input = block.querySelector('.answer-input');
  const reveal = block.querySelector('.reveal-text');
  const targetText = block.dataset.answer?.trim().toLowerCase() || '';

  input.addEventListener('input', () => {
    const value = input.value.trim().toLowerCase();
    const isCorrect = value === targetText && targetText !== '';

    input.classList.toggle('correct', isCorrect);
    input.classList.toggle('incorrect', value !== '' && !isCorrect);
    reveal.classList.toggle('visible', isCorrect);
    refreshSequenceCount();
  });
});

refreshSequenceCount();
