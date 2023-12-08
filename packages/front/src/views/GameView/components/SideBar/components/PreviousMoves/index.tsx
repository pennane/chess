import { FC } from 'react'

type TPreviousMovesProps = {
  moveHistory: string[]
}

export const PreviousMoves: FC<TPreviousMovesProps> = ({ moveHistory }) => {
  return (
    <div>
      {moveHistory.map((move, i) => (
        <div key={i}>{move}</div>
      ))}
    </div>
  )
}
