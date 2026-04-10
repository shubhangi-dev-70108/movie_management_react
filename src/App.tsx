import Footer from "./componenets/Footer";
import { Routes, Route } from "react-router-dom";
import AddMovieForm from "./pages/AddMovieForm";
import MovieList from "./pages/MovieList";
import SignIn from "./pages/SignIn";
import EditMovieForm from "./pages/EditMovieForm";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";
import WatchList from "./componenets/WatchList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Protected */}
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addmovie"
          element={
            <ProtectedRoute>
              <AddMovieForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editmovie/:id"
          element={
            <ProtectedRoute>
              <EditMovieForm />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
