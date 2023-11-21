import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetGameQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetGameQuery = { __typename?: 'Query', gameById?: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } | null };

export type CreateGameMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type JoinGameMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type JoinGameMutation = { __typename?: 'Mutation', joinGame: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type ToggleReadyMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  ready: Types.Scalars['Boolean']['input'];
}>;


export type ToggleReadyMutation = { __typename?: 'Mutation', toggleReady: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type ToggleDrawDesireMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  ready: Types.Scalars['Boolean']['input'];
}>;


export type ToggleDrawDesireMutation = { __typename?: 'Mutation', toggleDrawDesire: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type PlayMoveMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  move: Types.Scalars['String']['input'];
}>;


export type PlayMoveMutation = { __typename?: 'Mutation', playMove: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type LeaveGameMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type LeaveGameMutation = { __typename?: 'Mutation', leaveGame: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type ResignMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ResignMutation = { __typename?: 'Mutation', resign: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type ChessGameStateChangedSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ChessGameStateChangedSubscription = { __typename?: 'Subscription', chessGameStateChanged: { __typename?: 'ChessGame', id: string, fenString: string, status: Types.ChessGameStatus, moveHistory: Array<string>, players: Array<{ __typename?: 'ChessPlayer', id: string, color?: Types.ChessPieceColor | null, ready: boolean, desiresDraw: boolean }> } };

export type CurrentUserIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserIdQuery = { __typename?: 'Query', currentUserId: string };


export const GetGameDocument = gql`
    query GetGame($id: ID!) {
  gameById(gameId: $id) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;

/**
 * __useGetGameQuery__
 *
 * To run a query within a React component, call `useGetGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGameQuery(baseOptions: Apollo.QueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
      }
export function useGetGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
        }
export type GetGameQueryHookResult = ReturnType<typeof useGetGameQuery>;
export type GetGameLazyQueryHookResult = ReturnType<typeof useGetGameLazyQuery>;
export type GetGameQueryResult = Apollo.QueryResult<GetGameQuery, GetGameQueryVariables>;
export const CreateGameDocument = gql`
    mutation CreateGame {
  createGame {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const JoinGameDocument = gql`
    mutation JoinGame($id: ID!) {
  joinGame(gameId: $id) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;
export type JoinGameMutationFn = Apollo.MutationFunction<JoinGameMutation, JoinGameMutationVariables>;

/**
 * __useJoinGameMutation__
 *
 * To run a mutation, you first call `useJoinGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGameMutation, { data, loading, error }] = useJoinGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinGameMutation(baseOptions?: Apollo.MutationHookOptions<JoinGameMutation, JoinGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinGameMutation, JoinGameMutationVariables>(JoinGameDocument, options);
      }
export type JoinGameMutationHookResult = ReturnType<typeof useJoinGameMutation>;
export type JoinGameMutationResult = Apollo.MutationResult<JoinGameMutation>;
export type JoinGameMutationOptions = Apollo.BaseMutationOptions<JoinGameMutation, JoinGameMutationVariables>;
export const ToggleReadyDocument = gql`
    mutation ToggleReady($id: ID!, $ready: Boolean!) {
  toggleReady(gameId: $id, ready: $ready) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;
export type ToggleReadyMutationFn = Apollo.MutationFunction<ToggleReadyMutation, ToggleReadyMutationVariables>;

/**
 * __useToggleReadyMutation__
 *
 * To run a mutation, you first call `useToggleReadyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleReadyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleReadyMutation, { data, loading, error }] = useToggleReadyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      ready: // value for 'ready'
 *   },
 * });
 */
export function useToggleReadyMutation(baseOptions?: Apollo.MutationHookOptions<ToggleReadyMutation, ToggleReadyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleReadyMutation, ToggleReadyMutationVariables>(ToggleReadyDocument, options);
      }
export type ToggleReadyMutationHookResult = ReturnType<typeof useToggleReadyMutation>;
export type ToggleReadyMutationResult = Apollo.MutationResult<ToggleReadyMutation>;
export type ToggleReadyMutationOptions = Apollo.BaseMutationOptions<ToggleReadyMutation, ToggleReadyMutationVariables>;
export const ToggleDrawDesireDocument = gql`
    mutation ToggleDrawDesire($id: ID!, $ready: Boolean!) {
  toggleDrawDesire(gameId: $id, desireDraw: $ready) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;
export type ToggleDrawDesireMutationFn = Apollo.MutationFunction<ToggleDrawDesireMutation, ToggleDrawDesireMutationVariables>;

/**
 * __useToggleDrawDesireMutation__
 *
 * To run a mutation, you first call `useToggleDrawDesireMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleDrawDesireMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleDrawDesireMutation, { data, loading, error }] = useToggleDrawDesireMutation({
 *   variables: {
 *      id: // value for 'id'
 *      ready: // value for 'ready'
 *   },
 * });
 */
export function useToggleDrawDesireMutation(baseOptions?: Apollo.MutationHookOptions<ToggleDrawDesireMutation, ToggleDrawDesireMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleDrawDesireMutation, ToggleDrawDesireMutationVariables>(ToggleDrawDesireDocument, options);
      }
export type ToggleDrawDesireMutationHookResult = ReturnType<typeof useToggleDrawDesireMutation>;
export type ToggleDrawDesireMutationResult = Apollo.MutationResult<ToggleDrawDesireMutation>;
export type ToggleDrawDesireMutationOptions = Apollo.BaseMutationOptions<ToggleDrawDesireMutation, ToggleDrawDesireMutationVariables>;
export const PlayMoveDocument = gql`
    mutation PlayMove($id: ID!, $move: String!) {
  playMove(gameId: $id, move: $move) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;
export type PlayMoveMutationFn = Apollo.MutationFunction<PlayMoveMutation, PlayMoveMutationVariables>;

/**
 * __usePlayMoveMutation__
 *
 * To run a mutation, you first call `usePlayMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlayMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [playMoveMutation, { data, loading, error }] = usePlayMoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *      move: // value for 'move'
 *   },
 * });
 */
export function usePlayMoveMutation(baseOptions?: Apollo.MutationHookOptions<PlayMoveMutation, PlayMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlayMoveMutation, PlayMoveMutationVariables>(PlayMoveDocument, options);
      }
export type PlayMoveMutationHookResult = ReturnType<typeof usePlayMoveMutation>;
export type PlayMoveMutationResult = Apollo.MutationResult<PlayMoveMutation>;
export type PlayMoveMutationOptions = Apollo.BaseMutationOptions<PlayMoveMutation, PlayMoveMutationVariables>;
export const LeaveGameDocument = gql`
    mutation LeaveGame($id: ID!) {
  leaveGame(gameId: $id) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;
export type LeaveGameMutationFn = Apollo.MutationFunction<LeaveGameMutation, LeaveGameMutationVariables>;

/**
 * __useLeaveGameMutation__
 *
 * To run a mutation, you first call `useLeaveGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGameMutation, { data, loading, error }] = useLeaveGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveGameMutation(baseOptions?: Apollo.MutationHookOptions<LeaveGameMutation, LeaveGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveGameMutation, LeaveGameMutationVariables>(LeaveGameDocument, options);
      }
export type LeaveGameMutationHookResult = ReturnType<typeof useLeaveGameMutation>;
export type LeaveGameMutationResult = Apollo.MutationResult<LeaveGameMutation>;
export type LeaveGameMutationOptions = Apollo.BaseMutationOptions<LeaveGameMutation, LeaveGameMutationVariables>;
export const ResignDocument = gql`
    mutation Resign($id: ID!) {
  resign(gameId: $id) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;
export type ResignMutationFn = Apollo.MutationFunction<ResignMutation, ResignMutationVariables>;

/**
 * __useResignMutation__
 *
 * To run a mutation, you first call `useResignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resignMutation, { data, loading, error }] = useResignMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResignMutation(baseOptions?: Apollo.MutationHookOptions<ResignMutation, ResignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResignMutation, ResignMutationVariables>(ResignDocument, options);
      }
export type ResignMutationHookResult = ReturnType<typeof useResignMutation>;
export type ResignMutationResult = Apollo.MutationResult<ResignMutation>;
export type ResignMutationOptions = Apollo.BaseMutationOptions<ResignMutation, ResignMutationVariables>;
export const ChessGameStateChangedDocument = gql`
    subscription ChessGameStateChanged($id: ID!) {
  chessGameStateChanged(gameId: $id) {
    id
    fenString
    players {
      id
      color
      ready
      desiresDraw
    }
    status
    moveHistory
  }
}
    `;

/**
 * __useChessGameStateChangedSubscription__
 *
 * To run a query within a React component, call `useChessGameStateChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChessGameStateChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChessGameStateChangedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChessGameStateChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChessGameStateChangedSubscription, ChessGameStateChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChessGameStateChangedSubscription, ChessGameStateChangedSubscriptionVariables>(ChessGameStateChangedDocument, options);
      }
export type ChessGameStateChangedSubscriptionHookResult = ReturnType<typeof useChessGameStateChangedSubscription>;
export type ChessGameStateChangedSubscriptionResult = Apollo.SubscriptionResult<ChessGameStateChangedSubscription>;
export const CurrentUserIdDocument = gql`
    query CurrentUserId {
  currentUserId
}
    `;

/**
 * __useCurrentUserIdQuery__
 *
 * To run a query within a React component, call `useCurrentUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserIdQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserIdQuery, CurrentUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserIdQuery, CurrentUserIdQueryVariables>(CurrentUserIdDocument, options);
      }
export function useCurrentUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserIdQuery, CurrentUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserIdQuery, CurrentUserIdQueryVariables>(CurrentUserIdDocument, options);
        }
export type CurrentUserIdQueryHookResult = ReturnType<typeof useCurrentUserIdQuery>;
export type CurrentUserIdLazyQueryHookResult = ReturnType<typeof useCurrentUserIdLazyQuery>;
export type CurrentUserIdQueryResult = Apollo.QueryResult<CurrentUserIdQuery, CurrentUserIdQueryVariables>;