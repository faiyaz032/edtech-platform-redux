import sumMarks from '../utils/sumQuizMarks';

export default function useCalculateLeaderboard(users, quizMarks, assignmentMarks) {
  if ((users.length && quizMarks.length, assignmentMarks.length)) {
    //calculate the total marks
    const finalLeaderboard = users
      .map(user => {
        const totalQuizMarks = sumMarks(quizMarks, user.id);
        const totalAssignmentMarks = sumMarks(assignmentMarks, user.id);
        const totalMark = totalQuizMarks + totalAssignmentMarks;

        return { ...user, totalQuizMarks, totalAssignmentMarks, totalMark };
      })
      .sort((a, b) => b.totalMark - a.totalMark)
      .map((user, i) => {
        user.rank = i + 1;
        return user;
      });

    return finalLeaderboard;
  } else {
    return undefined;
  }
}
