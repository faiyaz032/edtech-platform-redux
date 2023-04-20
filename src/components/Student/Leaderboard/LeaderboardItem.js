import React from 'react';

export default function LeaderboardItem({ user }) {
  const { name, totalQuizMarks, totalAssignmentMarks, totalMark, rank } = user;

  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{rank}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{totalQuizMarks}</td>
      <td className="table-td text-center">{totalAssignmentMarks}</td>
      <td className="table-td text-center">{totalMark}</td>
    </tr>
  );
}
