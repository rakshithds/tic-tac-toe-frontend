import { ArrowLeft, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

import ApiService from '../services/api';
import { ROUTES } from '../utils/constants';
import LeaderboardItem from '../components/leaderboard/LeaderBoardItem';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await ApiService.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.MENU);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleBack}
            variant="secondary"
            icon={ArrowLeft}
          >
            Back
          </Button>
          
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Leaderboard
          </h2>
          
          <div className="w-20"></div>
        </div>
        
        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No players yet</p>
          ) : (
            leaderboard.map((player, index) => (
              <LeaderboardItem
                key={player.id} 
                player={player} 
                rank={index} 
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;