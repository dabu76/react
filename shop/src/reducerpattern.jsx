import React, { useReducer, createContext, useContext } from "react";

// 초기 상태 정의
const initialState = {
  count: 0,
  todos: [],
};

// 리듀서 함수 - 상태 업데이트 로직
function appReducer(state, action) {
  switch (action.type) {
    // 카운터 관련 액션
    case "increment":
      return { ...state, count: state.count + (action.payload || 1) };
    case "decrement":
      return { ...state, count: state.count - (action.payload || 1) };
    case "reset":
      return { ...state, count: 0 };

    // 할일 목록 관련 액션
    case "add_todo":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case "toggle_todo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "delete_todo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

// AppContext 생성
const AppContext = createContext();

// AppProvider 컴포넌트
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Provider를 통해 state와 dispatch를 제공
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 커스텀 훅 - 컨텍스트 사용을 편리하게
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext는 AppProvider 내부에서 사용해야 합니다");
  }
  return context;
}

// 카운터 컴포넌트
export function Counter() {
  const { state, dispatch } = useAppContext();

  return (
    <div>
      <h2>카운터: {state.count}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>증가</button>
      <button onClick={() => dispatch({ type: "decrement" })}>감소</button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        5 증가
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
        5 감소
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
    </div>
  );
}

// 할일 목록 컴포넌트
export function TodoList() {
  const { state, dispatch } = useAppContext();
  const [text, setText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "add_todo", payload: text });
      setText("");
    }
  };

  return (
    <div>
      <h2>할일 목록</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할일 추가"
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: "toggle_todo", payload: todo.id })
              }
            />
            <span>{todo.text}</span>
            <button
              onClick={() =>
                dispatch({ type: "delete_todo", payload: todo.id })
              }
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 앱 컴포넌트
function App() {
  return (
    <AppProvider>
      <div className="App">
        <h1>useReducer를 활용한 상태 관리</h1>
        <Counter />
        <hr />
        <TodoList />
      </div>
    </AppProvider>
  );
}

export default App;
