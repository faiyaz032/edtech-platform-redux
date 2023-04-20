import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardList({ leaderboard }) {
  //decide what to render

  return (
    <tbody>
      {/* <LeaderboardItem />; */}
      {leaderboard?.length &&
        leaderboard.map((user, i) => <LeaderboardItem key={user.id} user={user} />)}
    </tbody>
  );
}
