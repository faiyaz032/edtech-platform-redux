import _ from 'lodash';

export default function QuizItem({
  quiz,
  quizzes,
  questionNumber,
  userAnswer,
  setUserAnswers,
  quizSubmitted,
}) {
  const { question, options } = quiz;

  let modifiedQuizzes;

  const handleOnChange = e => {
    modifiedQuizzes = userAnswer.length ? _.cloneDeep(userAnswer) : _.cloneDeep(quizzes);

    const optionId = e.target.dataset.id;
    const questionId = e.target.dataset.questionnumber;

    modifiedQuizzes.forEach((obj, index) => {
      if (obj.id == questionId) {
        obj.options.forEach(opt => {
          if (+optionId === +opt.id) {
            opt.selected = e.target.checked;
          } else {
            opt.selected = Boolean(opt.selected);
          }
        });
      }
    });

    setUserAnswers(modifiedQuizzes);
  };

  let className;

  return (
    <div className="quiz">
      <h4 className="question">{question}</h4>
      <form className="quizOptions">
        {options.map((option, i) => {
          return (
            <label
              className={`${quizSubmitted && option.isCorrect ? 'correct-option' : ''} 
              ${quizSubmitted && !option.isCorrect ? 'incorrect-option' : ''}`}
              htmlFor={`option${i + 1}_q${questionNumber}`}
            >
              <input
                onChange={handleOnChange}
                data-id={i + 1}
                data-questionNumber={questionNumber}
                type="checkbox"
                id={`option${i + 1}_q${questionNumber}`}
              />
              {option.option}
            </label>
          );
        })}
      </form>
    </div>
  );
}
