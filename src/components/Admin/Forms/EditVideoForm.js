import { useEffect, useState } from 'react';
import { useEditVideoMutation, useGetVideoQuery } from '../../../features/videos/videosApi';

export default function EditVideoForm({ videoId, setOpenModal }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [views, setViews] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const [editVideo, { data: editedVideo, isError: editVideoError }] = useEditVideoMutation();

  const { data: video } = useGetVideoQuery(videoId);

  useEffect(() => {
    if (editVideoError) {
      setError('There was error creating video');
    }

    if (video?.id) {
      setTitle(video.title);
      setDescription(video.description);
      setUrl(video.url);
      setViews(video.views);
      setDuration(video.duration);
    }
  }, [editVideoError, setOpenModal, video]);

  const handleSubmit = e => {
    e.preventDefault();

    editVideo({
      id: videoId,
      data: { title, description, url, views, duration, createdAt: new Date() },
    });
    setOpenModal(false);
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
          Update Video
        </button>
      </div>
    </form>
  );
}
