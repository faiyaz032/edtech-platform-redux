import React, { useState } from 'react';
import { useCreateAssignmentMarkMutation } from '../../../features/assignmentMark/assignmentMarkApi';

export default function SubmitAssignmentForm({ setOpenModal, extraInfos, setAssignmentSubmitted }) {
  const [repositoryLink, setRepositoryLink] = useState('');
  const [error, setError] = useState(undefined);

  const [createAssignmentMark] = useCreateAssignmentMarkMutation();

  const handleSubmit = e => {
    e.preventDefault();
    setOpenModal(false);
    createAssignmentMark({
      ...extraInfos,
      repo_link: repositoryLink,
      totalMark: 100,
      mark: 0,
      status: 'pending',
      createdAt: new Date(),
    });
    setAssignmentSubmitted(true);
    setOpenModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="mb-5">
          <label htmlFor="repositoryLink" className="block text-sm font-bold mb-3">
            Repository Link
          </label>
          <input
            id="repositoryLink"
            name="repositoryLink"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md "
            placeholder="Enter Title"
            onChange={e => setRepositoryLink(e.target.value)}
            value={repositoryLink}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Submit Assignment
        </button>
      </div>
    </form>
  );
}
