import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start.jsx";
import Question1 from "./pages/Question1.jsx";
import Question2 from "./pages/SteroidRoutes.jsx";
import NoPage from "./pages/NoPage.jsx";
import SEC from "./pages/SEC.jsx";
import NoSEC from "./pages/NoSEC.jsx";
import SteroidRoutes from "./pages/SteroidRoutes.jsx";
import { RouteCompletionProvider } from "./components/RouteCompletionContext.jsx";
import Oral from "./pages/Oral.jsx";
import Injection from "./pages/Injection.jsx";
import Inhaled from "./pages/Inhaled.jsx";
import Nasal from "./pages/Nasal.jsx";
import Topical from "./pages/Topical.jsx";
import Rectal from "./pages/Rectal.jsx";
import Eye from "./pages/Eye.jsx";
import { OralDosageValProvider } from "./components/OralDosageValContext.jsx";

function App() {
  return (
    <>
      <RouteCompletionProvider>
        <OralDosageValProvider>
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
              <Route path="/routes/injection" element={<Injection />} />
              <Route path="/routes/inhaled" element={<Inhaled />} />
              <Route path="/routes/nasal" element={<Nasal />} />
              <Route path="/routes/topical" element={<Topical />} />
              <Route path="/routes/rectal" element={<Rectal />} />
              <Route path="/routes/eye" element={<Eye />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </OralDosageValProvider>
      </RouteCompletionProvider>
    </>
  );
}

export default App;
