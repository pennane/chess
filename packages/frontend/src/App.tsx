import { useState } from 'react'
import {
  useChessGameStateChangedSubscription,
  useCreateGameMutation,
  useCurrentUserIdQuery,
  useGetGameQuery,
  useJoinGameMutation,
  useLeaveGameMutation,
  usePlayMoveMutation,
  useResignMutation,
  useToggleReadyMutation
} from './query.generated'
import { ChessGameStatus } from './types'
import { fenToState } from './fen/fen'
import { ifElse, map, pipe, prop, reverse, splitEvery } from 'ramda'
import { fenPieceToImageSrc } from './fen/fen.lib'
import { FenPiece, State } from './fen/fen.models'

function getBoard(state: State | null, yourColor: string | null) {
  if (!state || !yourColor) return null
  return pipe(
    prop('board'),
    splitEvery(8),
    // @ts-expect-error types bad
    ifElse(() => yourColor === 'BLACK', map(reverse), reverse)
  )(state) as Array<Array<FenPiece | null>>
}

function App() {
  const { data: sessionIdData, loading: sessionIdDataLoading } =
    useCurrentUserIdQuery()
  const [gameIdInput, setGameIdInput] = useState<string>('')
  const [move, setMove] = useState<string>('')
  const [gameId, setGameId] = useState<string | null>(null)

  useChessGameStateChangedSubscription({
    skip: !gameId,
    variables: { id: gameId! }
  })

  const { data } = useGetGameQuery({
    variables: {
      id: gameId!
    },
    skip: !gameId
  })

  const game = data?.gameById
  const currentUserId = sessionIdData?.currentUserId

  const [createGame] = useCreateGameMutation()
  const [joinGame] = useJoinGameMutation()
  const [playMove] = usePlayMoveMutation()
  const [resign] = useResignMutation()
  const [leave] = useLeaveGameMutation()
  const [toggleReady] = useToggleReadyMutation()

  if (sessionIdDataLoading) return 'loadin bro'

  const partOfGame = !!game?.players.some((p) => p.id === currentUserId)
  const gameStarted = game?.status === ChessGameStatus.InProgress
  const yourColor =
    game?.players.find((p) => p.id === currentUserId)?.color || null

  const state = game?.fenString ? fenToState(game.fenString) : null
  const board = getBoard(state, yourColor)

  return (
    <div className="chess">
      <h1>chess</h1>

      {!game && (
        <>
          <button
            onClick={() =>
              createGame({
                onCompleted: (data) => {
                  setGameId(data.createGame.id)
                }
              })
            }
          >
            create
          </button>
          <h3>Id for joining:</h3>
          <input
            value={gameIdInput}
            onChange={(e) => setGameIdInput(e.target.value)}
          />

          <button
            onClick={() =>
              joinGame({
                variables: { id: gameIdInput },
                onCompleted: (data) => {
                  setGameId(data.joinGame.id.trim())
                }
              })
            }
          >
            join
          </button>
        </>
      )}

      {partOfGame && (
        <>
          <button
            onClick={() =>
              leave({
                variables: { id: gameId! },
                onCompleted: () => {
                  setGameId(null)
                }
              })
            }
          >
            leave
          </button>
        </>
      )}
      {!gameStarted && partOfGame && (
        <>
          <button
            onClick={() =>
              toggleReady({
                variables: {
                  id: gameId!,
                  ready: !game?.players.find((p) => p.id === currentUserId)!
                    .ready
                }
              })
            }
          >
            toggle ready
          </button>
        </>
      )}
      {gameStarted && partOfGame && (
        <>
          <h3>Move box:</h3>
          <input value={move} onChange={(e) => setMove(e.target.value)} />
          <button
            onClick={() =>
              playMove({
                variables: { id: gameId!, move }
              })
            }
          >
            play move
          </button>
          <button
            onClick={() =>
              resign({
                variables: { id: gameId! }
              })
            }
          >
            resign
          </button>
        </>
      )}

      {sessionIdData && <p>your id {sessionIdData.currentUserId}</p>}
      {game && <p>game id {game.id}</p>}
      {yourColor && <p>your color: {yourColor}</p>}
      {state && <p>current turn: {state.sideToMove}</p>}
      {game && <p>game state: {game.status}</p>}

      {game?.fenString && (
        <div className="board">
          {board?.map((rank, y) => {
            return (
              <div className="rank" key={y}>
                {rank.map((piece, x) => (
                  <div className="piece" key={x}>
                    {piece ? <img src={fenPieceToImageSrc(piece)}></img> : ''}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
