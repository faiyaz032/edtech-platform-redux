import { useEffect, useState } from 'react';
import { useCreateQuizMutation } from '../../../features/quizzes/quiezzesApi';
import { useGetVideosQuery } from '../../../features/videos/videosApi';

export default function AddQuizForm({ setOpenModal }) {
  const [videoId, setVideoId] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, option: '', isCorrect: false },
    { id: 2, option: '', isCorrect: false },
    { id: 3, option: '', isCorrect: false },
    { id: 4, option: '', isCorrect: false },
  ]);

  const [error, setError] = useState('');

  // use the useGetVideosQuery hook to fetch videos
  const { data: videos, isError } = useGetVideosQuery();

  // use the useCreateQuizMutation hook to create a new quiz a
  const [createQuiz, { data: createdQuiz, isError: quizResponseError }] = useCreateQuizMutation();

  useEffect(() => {
    // if there's an error creating a quiz, set the error state variable accordingly
    if (quizResponseError) {
      setError('There was error creating a quiz');
    }
    // if a quiz has been successfully created, close the modal by setting setOpenModal to false
    if (createdQuiz?.id) {
      setOpenModal(false);
    }
  }, [quizResponseError, setOpenModal, createdQuiz]);

  //handleOptionInputOnChange that updates the options state variable when an option input field changes
  const handleOptionInputOnChange = (event, input) => {
    const newOptions = options.map(option => {
      if (option.id === input.id) {
        return { ...option, option: event.target.value };
      }
      return option;
    });
    setOptions(newOptions);
  };

  //handleCheckBoxChange that updates the options state variable when a checkbox changes
  const handleCheckBoxChange = (event, input) => {
    const newOptions = options.map(option => {
      if (option.id === input.id) {
        return { ...option, isCorrect: event.target.checked };
      }
      return option;
    });
    setOptions(newOptions);
  };

  //handleSubmit that creates a new quiz with the entered data when the form is submitted
  const handleSubmit = e => {
    e.preventDefault();
    const videoTitle = videos.reduce((acc, curr) => {
      if (+curr.id === +videoId) {
        acc = curr.title;
      }
      return acc;
    }, '');

    const data = {
      question,
      options,
      video_id: Number(videoId),
      video_title: videoTitle,
    };
    createQuiz(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="mb-5">
          <label htmlFor="selectVideo" className="block text-sm font-bold mb-3">
            Select Video
          </label>
          <select
            name="videoId"
            className="w-full input-bg p-4"
            id="selectVideo"
            onChange={e => setVideoId(e.target.value)}
            defaultValue={videoId}
          >
            <option value={''} hidden>
              Select a Video
            </option>
            {!isError &&
              videos?.map(video => {
                return (
                  <option key={video.id} value={video.id}>
                    {video.title}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="question" className="block text-sm font-bold mb-3">
            Question
          </label>
          <input
            id="question"
            name="question"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Question"
            onChange={e => setQuestion(e.target.value)}
            value={question}
          />
        </div>

        {options.map((option, i) => {
          return (
            <div key={option.id} data-id={option.id} className="mb-5">
              <label htmlFor={`option${option.id}`} className="block text-sm font-bold mb-3">
                {`Option ${option.id}`}
              </label>
              <input
                id={`option${option.id}`}
                name={`option${option.id}`}
                type="text"
                autoComplete={`option${option.id}`}
                required
                className="login-input rounded-t-md"
                onChange={e => handleOptionInputOnChange(e, option)}
                value={option.option}
                placeholder={`Enter Option ${option.id}`}
              />

              <input
                type="checkbox"
                name="isCorrect"
                id="isCorrect"
                className="mt-1"
                defaultValue={option.isCorrect}
                onChange={e => handleCheckBoxChange(e, option)}
              />
              <label htmlFor="isCorrect" className="ml-1">
                Correct
              </label>
            </div>
          );
        })}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create Quiz
        </button>
      </div>
    </form>
  );
}
