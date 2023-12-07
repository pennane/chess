import { ChessBoard } from './components/ChessBoard/ChessBoard'
import { INITIAL_CHESS_BOARD_FEN_STRING } from './chess/chess.constants'
import { fenStringToState } from './chess/chess.lib'

function App() {
  const state = fenStringToState(INITIAL_CHESS_BOARD_FEN_STRING)
  return (
    <div>
      <h1>chess</h1>
      <ChessBoard board={state.board} sidePlaying="WHITE" />
    </div>
  )
}

export default App
