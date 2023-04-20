import { useEffect, useState } from 'react';
import { useCreateAssignmentMutation } from '../../../features/assignments/assignmentsApi';
import { useGetVideosQuery } from '../../../features/videos/videosApi';

export default function AddAssignmentForm({ setOpenModal }) {
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [error, setError] = useState('');

  // use the useGetVideosQuery hook to fetch videos
  const { data: videos, isError } = useGetVideosQuery();
  const [createAssignment, { data: createdAssignment, isError: createAssignmentError }] =
    useCreateAssignmentMutation();

  useEffect(() => {
    if (createAssignmentError) {
      setError('There was error creating assignment');
    }

    if (createdAssignment?.id) {
      setOpenModal(false);
    }
  }, [createAssignmentError, setOpenModal, createdAssignment]);

  const handleSubmit = e => {
    e.preventDefault();

    const videoTitle = videos.reduce((acc, curr) => {
      if (+curr.id === +videoId) {
        acc = curr.title;
      }
      return acc;
    }, '');

    createAssignment({
      video_id: +videoId,
      video_title: videoTitle,
      title,
      totalMark: +totalMarks,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="mb-5">
          <label htmlFor="selectVideo" className="block text-sm font-bold mb-3">
            Select Video
          </label>
          <select
            required
            name="videoId"
            className="w-full input-bg p-4"
            id="selectVideo"
            onChange={e => setVideoId(e.target.value)}
            defaultValue={videoId}
          >
            <option hidden value={''}>
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
          <label htmlFor="title" className="block text-sm font-bold mb-3">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="totalMarks" className="block text-sm font-bold mb-3">
            Total Marks
          </label>
          <input
            id="totalMarks"
            name="totalMarks"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Title"
            onChange={e => setTotalMarks(e.target.value)}
            value={totalMarks}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create Assignment
        </button>
      </div>
    </form>
  );
}
