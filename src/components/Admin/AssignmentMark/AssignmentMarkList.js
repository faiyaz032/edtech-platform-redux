import { useGetAssignmentsMarksQuery } from '../../../features/assignmentMark/assignmentMarkApi';
import Error from '../../UI/Error/Error';
import AssignmentMarkItem from './AssignmentMarkItem';

export default function AssignmentMarkList() {
  const { data: assignmentMarks, isLoading, error, isError } = useGetAssignmentsMarksQuery();
  //decide what to render
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error message={error.data} />;
  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <h3>No Videos Found</h3>;
  }
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = assignmentMarks.map(assignmentMark => {
      return <AssignmentMarkItem key={assignmentMark.id} assignmentMark={assignmentMark} />;
    });
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
