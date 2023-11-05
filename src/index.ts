import { DEFAULT_POSITION } from './chess/chess.constants'
import { fenToState, stateToFen } from './fen/fen'

console.log(stateToFen(fenToState(DEFAULT_POSITION)))
console.log(DEFAULT_POSITION)
