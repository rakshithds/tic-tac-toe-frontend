
const LeaderboardItem = ({ player, rank }) => {
  const getRankStyle = () => {
    switch (rank) {
      case 0: return 'bg-yellow-100';
      case 1: return 'bg-gray-100';
      case 2: return 'bg-orange-100';
      default: return 'bg-white border-2';
    }
  };
  
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${getRankStyle()}`}>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-gray-700 w-8">
          {rank + 1}
        </span>
        <span className="font-semibold text-gray-800">{player.name}</span>
      </div>
      <div className="flex gap-6 text-sm">
        <span className="text-green-600 font-medium">W: {player.wins}</span>
        <span className="text-red-600 font-medium">L: {player.losses}</span>
        <span className="text-gray-600 font-medium">D: {player.draws}</span>
      </div>
    </div>
  );
};

export default LeaderboardItem;