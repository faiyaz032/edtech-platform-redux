import { useEffect, useState } from 'react';
import { useCreateVideoMutation } from '../../../features/videos/videosApi';

export default function AddVideoForm({ setOpenModal }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [views, setViews] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const [createVideo, { data: createdVideo, isError: createVideoError }] = useCreateVideoMutation();

  useEffect(() => {
    if (createVideoError) {
      setError('There was error creating video');
    }

    if (createdVideo?.id) {
      setOpenModal(false);
    }
  }, [createVideoError, setOpenModal, createdVideo]);

  const handleSubmit = e => {
    e.preventDefault();

    createVideo({
      title,
      description,
      url,
      views,
      duration,
      createdAt: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
      <div className="rounded-md shadow-sm -space-y-px">
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
          <label htmlFor="description" className="block text-sm font-bold mb-3">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Description"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="url" className="block text-sm font-bold mb-3">
            Url
          </label>
          <input
            id="url"
            name="url"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Url"
            onChange={e => setUrl(e.target.value)}
            value={url}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="views" className="block text-sm font-bold mb-3">
            Views
          </label>
          <input
            id="views"
            name="views"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Views"
            onChange={e => setViews(e.target.value)}
            value={views}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="duration" className="block text-sm font-bold mb-3">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Duration"
            onChange={e => setDuration(e.target.value)}
            value={duration}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create Video
        </button>
      </div>
    </form>
  );
}
