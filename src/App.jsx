import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start.jsx";
import Question1 from "./pages/Question1.jsx";
import Question2 from "./pages/SteroidRoutes.jsx";
import NoPage from "./pages/NoPage.jsx";
import SEC from "./pages/SEC.jsx";
import NoSEC from "./pages/NoSEC.jsx";
import SteroidRoutes from "./pages/SteroidRoutes.jsx";
import Oral from "./pages/Oral.jsx";
import { RouteCompletionProvider } from "./components/RouteCompletionContext.jsx";

function App() {
  return (
    <>
      <RouteCompletionProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Start />} />
            <Route path="/start" element={<Start />} />
            <Route path="/q1" element={<Question1 />} />
            <Route path="/q2/" element={<Question2 />} />
            <Route path="/sec" element={<SEC />} />
            <Route path="/nosec" element={<NoSEC />} />
            <Route path="/routes" element={<SteroidRoutes />} />
            <Route path="/routes/oral" element={<Oral />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </RouteCompletionProvider>
    </>
  );
}

export default App;
