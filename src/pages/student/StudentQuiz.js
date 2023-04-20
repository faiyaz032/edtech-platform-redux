import { useParams } from 'react-router-dom';
import QuizList from '../../components/Student/Quiz/QuizList';
import Error from '../../components/UI/Error/Error';
import { useGetQuizzesByVideoIdQuery } from '../../features/quizzes/quiezzesApi';

export default function StudentQuiz() {
  const { videoId } = useParams();

  const { data: quizzes, isLoading, isError, error } = useGetQuizzesByVideoIdQuery(videoId);

  //decide what to render
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error message={error.data} />;
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = <h3>No Quizzes Found</h3>;
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Quizzes for "{`${quizzes[0].video_title}`}"</h1>
          <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
        </div>

        <QuizList quizzes={quizzes} />
      </div>
    );
  }

  return <section className="py-6 bg-primary">{content}</section>;
}
