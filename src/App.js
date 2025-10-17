import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Game from './pages/Game';
import Home from './pages/Home';
import Menu from './pages/Menu';
import { ROUTES } from './utils/constants';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.GAME} element={<Game />} />
          <Route path={ROUTES.LEADERBOARD} element={<Leaderboard />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;