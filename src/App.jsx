import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemsList from './components/ItemsList';
import ItemFormFind from './components/ItemFormFind';
import SignIn from './components/SignIn';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    /* Add the Router component to the App */
    <Router>
      <div>
        <h1>My Front-end</h1>
        <nav>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            )}
        </nav>

        {/* Add the Routes component to the App */}
        {/* Routes is  */}
        <Routes>
          <Route path="/signin" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={
            <> 
              <div className="card">
                {isLoggedIn ? (
                  <>
                    <p><ItemsList/></p>
                    <p><ItemFormFind/></p>
                  </>
                ) : (
                  <p>Please sign in to view the items.</p>
                )}
              </div>
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
