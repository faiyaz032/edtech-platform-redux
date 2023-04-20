import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../../components/Student/Leaderboard/LeaderboardList';
import UserPosition from '../../components/Student/Leaderboard/UserPosition';
import assignmentMarkApi from '../../features/assignmentMark/assignmentMarkApi';
import { quizMarkApi } from '../../features/quizMark/quizMarkApi';
import { usersApi } from '../../features/users/userApi';
import useCalculateLeaderboard from '../../hooks/useCalculateMarks';

export default function Leaderboard() {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  //Run on first render only
  useEffect(() => {
    dispatch(usersApi.endpoints.getUsers.initiate());
    dispatch(quizMarkApi.endpoints.getQuizMarks.initiate());
    dispatch(assignmentMarkApi.endpoints.getAssignmentsMarks.initiate());
  }, [dispatch, user.id]);

  const { users, quizMarks, assignmentMarks } = useSelector(state => state.leaderboard);

  const leaderboard = useCalculateLeaderboard(users, quizMarks, assignmentMarks);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {leaderboard?.length && (
          <>
            <UserPosition leaderboard={leaderboard} />

            <div className="my-8">
              <h3 className="text-lg font-bold">Top 20 Result</h3>
              <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                <thead>
                  <tr className="border-b border-slate-600/50">
                    <th className="table-th !text-center">Rank</th>
                    <th className="table-th !text-center">Name</th>
                    <th className="table-th !text-center">Quiz Mark</th>
                    <th className="table-th !text-center">Assignment Mark</th>
                    <th className="table-th !text-center">Total</th>
                  </tr>
                </thead>

                <LeaderboardList leaderboard={leaderboard} />
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
