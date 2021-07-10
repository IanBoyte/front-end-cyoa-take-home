import CommentFeed from "./components/CommentFeed";

import "./scss/App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Comments Feed</h1>
      </header>
      <main className="main-content">
        <CommentFeed />
      </main>
    </div>
  );
}

export default App;
