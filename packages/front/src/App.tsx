import { ChessBoard } from './components/ChessBoard/ChessBoard'
import { INITIAL_CHESS_BOARD_FEN_STRING } from './constants'
import { fenStringToState } from './lib'

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
