import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateQuizMarkMutation } from '../../../features/quizMark/quizMarkApi';
import QuizItem from './QuizItem';

export default function QuizList({ quizzes }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [mark, setMark] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const { user } = useSelector(state => state.auth);

  const navigate = useNavigate();

  const [quizMark] = useCreateQuizMarkMutation();

  useEffect(() => {
    if (isUpdating) {
      // perform side effects that require updated state here
      const data = {
        student_id: user.id,
        video_id: quizzes[0].video_id,
        video_title: quizzes[0].video_title,
        totalQuiz: quizzes.length,
        totalCorrect,
        totalWrong,
        totalMark: quizzes.length * 5,
        mark,
      };

      setIsUpdating(false);
      setQuizSubmitted(true);
      quizMark(data); // set isUpdating to false after updating the state and performing side effects
    }
  }, [isUpdating, mark, quizzes, totalCorrect, totalWrong, user.id, quizMark]);

  const handleButtonClose = () => {
    navigate(`/course-player?video_id=${quizzes[0].video_id}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsUpdating(true);
    userAnswers.length &&
      userAnswers.forEach(answer => {
        const { options } = answer;
        const isCorrect = options.every(option => {
          return option.isCorrect === option.selected;
        });
        if (isCorrect) {
          setTotalCorrect(prevState => prevState + 1);
          setMark(prevState => prevState + 5);
        } else {
          setTotalWrong(prevState => prevState + 1);
        }
      });
  };

  return (
    <>
      <div className="space-y-8 ">
        {quizzes.map((quiz, i) => (
          <QuizItem
            key={quiz.id}
            quizzes={quizzes}
            quiz={quiz}
            questionNumber={i + 1}
            userAnswer={userAnswers}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            quizSubmitted={quizSubmitted}
          />
        ))}
      </div>
      {quizSubmitted && (
        <h2 className="text-xl font-bold mt-3 result-quiz">
          You correctly answered {totalCorrect} questions. Your Mark is {mark}
        </h2>
      )}
      {quizSubmitted ? (
        <button
          onClick={handleButtonClose}
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
        >
          Close
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
        >
          Submit
        </button>
      )}
    </>
  );
}
