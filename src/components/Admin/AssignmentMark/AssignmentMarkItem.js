import { useState } from 'react';
import { useEditAssignmentMarkMutation } from '../../../features/assignmentMark/assignmentMarkApi';
import formatTime from '../../../utils/formatTime';

export default function AssignmentMarkItem({ assignmentMark }) {
  const [mark, setMark] = useState('');

  const {
    id,
    student_name,
    title,
    repo_link,
    createdAt,
    totalMark,
    assignment_id,
    student_id,
    status,
  } = assignmentMark;

  const [editAssignmentMark, { isError }] = useEditAssignmentMarkMutation();

  const handleSubmit = e => {
    e.preventDefault();
    if (!mark) return;
    editAssignmentMark({
      id,
      data: {
        student_name,
        student_id,
        title,
        repo_link,
        createdAt,
        status: 'published',
        mark: mark,
        totalMark,
        assignment_id,
      },
    });
  };

  return (
    <>
      <tr>
        <td className="table-td">{title}</td>
        <td className="table-td">{formatTime(createdAt)}</td>
        <td className="table-td">{student_name}</td>
        <td className="table-td">{repo_link}</td>
        <td className="table-td input-mark">
          {status === 'pending' ? (
            <>
              <input
                type="number"
                placeholder="100"
                max="100"
                value={mark}
                onChange={e => setMark(e.target.value)}
              />
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                onClick={handleSubmit}
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </>
          ) : (
            <p className="m-auto">{`${assignmentMark.mark}`}</p>
          )}
        </td>
      </tr>

      {/* Modal */}
    </>
  );
}
