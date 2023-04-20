import React from 'react';
import { useGetAssignmentsQuery } from '../../../features/assignments/assignmentsApi';
import Error from '../../UI/Error/Error';
import AssignmentListItem from './AssignmentListItem';

export default function AssignmentList() {
  const { data: assignments, isError, error, isLoading } = useGetAssignmentsQuery();

  //decide what to render
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error message={error.data} />;
  if (!isLoading && !isError && assignments?.length === 0) {
    content = <h3>No Assignments Found</h3>;
  }
  if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments.map(assignment => {
      return <AssignmentListItem key={assignment.id} assignment={assignment} />;
    });
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
