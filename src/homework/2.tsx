import React, { useReducer } from "react";

type State = {
  isRequestInProgress: boolean;
  requestStep: "start" | "pending" | "finished" | "idle";
};
enum ActionTypes {
  START_REQUEST = "START_REQUEST",
  PENDING_REQUEST = "PENDING_REQUEST",
  FINISH_REQUEST = "FINISH_REQUEST",
  RESET_REQUEST = "RESET_REQUEST",
}

type Action =
  | { type: ActionTypes.START_REQUEST }
  | { type: ActionTypes.PENDING_REQUEST }
  | { type: ActionTypes.FINISH_REQUEST }
  | { type: ActionTypes.RESET_REQUEST };

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.START_REQUEST:
      return { ...state, isRequestInProgress: true, requestStep: "start" };
    case ActionTypes.PENDING_REQUEST:
      return { ...state, isRequestInProgress: true, requestStep: "pending" };
    case ActionTypes.FINISH_REQUEST:
      return { ...state, isRequestInProgress: false, requestStep: "finished" };
    case ActionTypes.RESET_REQUEST:
      return { ...state, isRequestInProgress: false, requestStep: "idle" };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = () => {
    requestDispatch({ type: ActionTypes.START_REQUEST });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: ActionTypes.PENDING_REQUEST });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: ActionTypes.FINISH_REQUEST });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: ActionTypes.RESET_REQUEST });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
