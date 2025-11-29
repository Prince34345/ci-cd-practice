import React, { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    },
    wrapper: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '30px',
      color: 'white'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      padding: '30px'
    },
    inputWrapper: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px'
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none'
    },
    addButton: {
      padding: '12px 24px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    filterWrapper: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px'
    },
    filterButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      textTransform: 'capitalize'
    },
    filterActive: {
      backgroundColor: '#667eea',
      color: 'white'
    },
    filterInactive: {
      backgroundColor: '#f0f0f0',
      color: '#666'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 0',
      color: '#999',
      fontSize: '18px'
    },
    todoList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      marginBottom: '8px'
    },
    checkbox: {
      width: '24px',
      height: '24px',
      border: '2px solid #ddd',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0
    },
    checkboxCompleted: {
      backgroundColor: '#4caf50',
      borderColor: '#4caf50'
    },
    todoText: {
      flex: 1,
      fontSize: '16px',
      color: '#333'
    },
    todoTextCompleted: {
      textDecoration: 'line-through',
      color: '#999'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#f44336',
      fontSize: '24px',
      cursor: 'pointer',
      padding: '0 8px'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #e0e0e0'
    },
    footerText: {
      fontSize: '14px',
      color: '#666'
    },
    clearButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#f44336',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>My Tasks</h1>
        
        <div style={styles.card}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo(e)}
              placeholder="What needs to be done?"
              style={styles.input}
            />
            <button onClick={addTodo} style={styles.addButton}>
              + Add
            </button>
          </div>

          <div style={styles.filterWrapper}>
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...styles.filterButton,
                  ...(filter === f ? styles.filterActive : styles.filterInactive)
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {filteredTodos.length === 0 ? (
            <div style={styles.emptyState}>
              No tasks {filter !== 'all' ? filter : 'yet'}
            </div>
          ) : (
            <ul style={styles.todoList}>
              {filteredTodos.map(todo => (
                <li key={todo.id} style={styles.todoItem}>
                  <div
                    onClick={() => toggleTodo(todo.id)}
                    style={{
                      ...styles.checkbox,
                      ...(todo.completed ? styles.checkboxCompleted : {})
                    }}
                  >
                    {todo.completed && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
                  </div>
                  <span
                    style={{
                      ...styles.todoText,
                      ...(todo.completed ? styles.todoTextCompleted : {})
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={styles.deleteButton}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {todos.length > 0 && (
            <div style={styles.footer}>
              <span style={styles.footerText}>
                {activeCount} {activeCount === 1 ? 'item' : 'items'} left
              </span>
              {todos.some(todo => todo.completed) && (
                <button onClick={clearCompleted} style={styles.clearButton}>
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}