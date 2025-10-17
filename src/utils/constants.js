// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
// export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/game';
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://tic-tac-toe-backend.railway.app/api';
export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://tic-tac-toe-backend.railway.app/game';

export const GAME_STATUS = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
};

export const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  GAME: '/game',
  LEADERBOARD: '/leaderboard'
};