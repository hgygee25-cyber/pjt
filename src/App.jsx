import { useState } from "react";

function App() {
  // 할 일 목록
  const [todos, setTodos] = useState([]);

  // 입력한 내용
  const [input, setInput] = useState("");

  // 할 일 추가
  const addTodo = () => {
    if (input.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        done: false,
      },
    ]);

    setInput("");
  };

  // 완료 상태 변경
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>🌷 오늘의 할 일</h1>

      <div>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          style={styles.input}
        />

        <button onClick={addTodo} style={styles.addButton}>
          추가
        </button>
      </div>

      <div style={styles.list}>
        {todos.map((todo) => (
          <div key={todo.id} style={styles.todo}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                ...styles.text,
                textDecoration: todo.done
                  ? "line-through"
                  : "none",
                color: todo.done ? "#aaa" : "#555",
              }}
            >
              {todo.done ? "✅" : "⬜"} {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <p style={styles.count}>
        총 {todos.length}개의 할 일
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: "450px",
    margin: "80px auto",
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#fff9f5",
    borderRadius: "20px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
  },

  input: {
    width: "280px",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontSize: "16px",
  },

  addButton: {
    marginLeft: "8px",
    padding: "12px 16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#ffd6a5",
    cursor: "pointer",
  },

  list: {
    marginTop: "25px",
  },

  todo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "8px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
  },

  text: {
    cursor: "pointer",
    fontSize: "17px",
  },

  deleteButton: {
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    backgroundColor: "#ffcdd2",
    cursor: "pointer",
  },

  count: {
    marginTop: "25px",
    color: "#999",
  },
};

export default App;
