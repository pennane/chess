export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Chess game, including its current state and history */
export type ChessGame = {
  __typename?: 'ChessGame';
  fenString: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  moveHistory: Array<Scalars['String']['output']>;
  players: Array<ChessPlayer>;
  status: ChessGameStatus;
};

/** Various statuses a chess game can have */
export enum ChessGameStatus {
  Abandoned = 'ABANDONED',
  Checkmate = 'CHECKMATE',
  Draw = 'DRAW',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED',
  Resigned = 'RESIGNED',
  Stalemate = 'STALEMATE'
}

/** The color of a chess piece */
export enum ChessPieceColor {
  Black = 'BLACK',
  White = 'WHITE'
}

/** Player in a chess game */
export type ChessPlayer = {
  __typename?: 'ChessPlayer';
  color?: Maybe<ChessPieceColor>;
  desiresDraw: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  ready: Scalars['Boolean']['output'];
};

/** Mutations available for changing the state of a chess game */
export type Mutation = {
  __typename?: 'Mutation';
  createGame: ChessGame;
  joinGame: ChessGame;
  leaveGame: ChessGame;
  playMove: ChessGame;
  resign: ChessGame;
  toggleDrawDesire: ChessGame;
  toggleReady: ChessGame;
};


/** Mutations available for changing the state of a chess game */
export type MutationJoinGameArgs = {
  gameId: Scalars['ID']['input'];
};


/** Mutations available for changing the state of a chess game */
export type MutationLeaveGameArgs = {
  gameId: Scalars['ID']['input'];
};


/** Mutations available for changing the state of a chess game */
export type MutationPlayMoveArgs = {
  gameId: Scalars['ID']['input'];
  move: Scalars['String']['input'];
};


/** Mutations available for changing the state of a chess game */
export type MutationResignArgs = {
  gameId: Scalars['ID']['input'];
};


/** Mutations available for changing the state of a chess game */
export type MutationToggleDrawDesireArgs = {
  desireDraw: Scalars['Boolean']['input'];
  gameId: Scalars['ID']['input'];
};


/** Mutations available for changing the state of a chess game */
export type MutationToggleReadyArgs = {
  gameId: Scalars['ID']['input'];
  ready: Scalars['Boolean']['input'];
};

/** Queries available in the chess game API */
export type Query = {
  __typename?: 'Query';
  currentUserId: Scalars['ID']['output'];
  gameById?: Maybe<ChessGame>;
};


/** Queries available in the chess game API */
export type QueryGameByIdArgs = {
  gameId: Scalars['ID']['input'];
};

/** Realtime websocket subscriptions available for the chesss game API */
export type Subscription = {
  __typename?: 'Subscription';
  chessGameStateChanged: ChessGame;
};


/** Realtime websocket subscriptions available for the chesss game API */
export type SubscriptionChessGameStateChangedArgs = {
  gameId: Scalars['ID']['input'];
};
