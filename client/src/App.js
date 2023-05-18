import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import JobCard from "./components/jobCard";
import HomePage from "./pages/Home";
function App() {
  const [loading, setLoading] = React.useState(true);
  const preLoader = document.getElementById("preLoader");

  if (preLoader) {
    setTimeout(() => {
      preLoader.style.display = "none";
      setLoading(false);
    }, 3000);
  }

  return (
    !loading && (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="HomePage" element={<HomePage />} />
            <Route path="JobCard" element={<JobCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  );
}

export default App;
