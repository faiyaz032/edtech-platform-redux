import { useGetQuizzesQuery } from '../../../features/quizzes/quiezzesApi';
import Error from '../../UI/Error/Error';
import QuizzesItem from './QuizzesItem';

export default function QuizzesList() {
  const { data: quizzes, isError, error, isLoading } = useGetQuizzesQuery();

  //decide what to render
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error message={error.data} />;
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = <h3>No Quizzes Found</h3>;
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes.map(quiz => {
      return <QuizzesItem key={quiz.id} quiz={quiz} />;
    });
  }

  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
