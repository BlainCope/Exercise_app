import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditExercise from './pages/EditExercisePage';
import CreateExercise from './pages/CreateExercisePage';
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation';
import './App.css';

function App() {

  return (
    <Router>
      <header>
        <h1>Exercise Tracker</h1>
        <p>An app to aid your workout adventure!</p>
      </header>
      
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
        </Routes>
      </main>

      <footer>
        &copy; 2023 by Blain Cope
      </footer>
    </Router>
  );
}

export default App;
