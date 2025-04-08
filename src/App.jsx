/**
 *  App component
 *
 * This is the root component of the application.
 * It sets up global context providers for route completion,user answers and oral dosage values.
 * 
 * Routes are defined using React Router's BrowserRouter, Routes and Route components.
 * 
 * 
 * This component has 4 states, SEC required , No SEC Required
 * or an error state where it shows an error message if navigated to without completing previous questions
 *
 * The SEC requirement is set from other routes and can only be accessed from scenarios where the patient needs an SEC.
 
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

/**
 *  Defined Routes:
 * "/" and "/start": Start page, the landing page of the app.
 * "/q1": Page for the first question.
 * "/q2": Page for the second question (SteroidRoutes component).
 * "/routes": Main SteroidRoutes page, allowing the user to choose a specific route.
 * Additional routes under "/routes/*" for Oral, Injection, Inhaled, Nasal, Topical, Rectal, and Eye routes.
 * "/end": End page for the final output of sec requirement.
 * "/sickdayrules": Page providing sick day rules.
 * "*" (wildcard): Fallback route that renders a NoPage component for undefined URLs.
 */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Start from "./pages/Start.jsx";
import Question1 from "./pages/Question1.jsx";
import Question2 from "./pages/SteroidRoutes.jsx";
import NoPage from "./pages/NoPage.jsx";
import SteroidRoutes from "./pages/SteroidRoutes.jsx";
import Oral from "./pages/Oral.jsx";
import Injection from "./pages/Injection.jsx";
import Inhaled from "./pages/Inhaled.jsx";
import Nasal from "./pages/Nasal.jsx";
import Topical from "./pages/Topical.jsx";
import Rectal from "./pages/Rectal.jsx";
import Eye from "./pages/Eye.jsx";
import EndPage from "./pages/EndPage.jsx";
import SickDayRules from "./pages/SickDayRules.jsx";

// Context providers
import { OralDosageValProvider } from "./components/OralDosageValContext.jsx";
import { UserAnswersProvider } from "./components/UserAnswerContext.jsx";
import { RouteCompletionProvider } from "./components/RouteCompletionContext.jsx";

function App() {
  return (
    <>
      {/* Global context providers wrap the entire application,to pass values to children */}
      <RouteCompletionProvider>
        <UserAnswersProvider>
          <OralDosageValProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Start />} />
                <Route path="/start" element={<Start />} />
                <Route path="/q1" element={<Question1 />} />
                <Route path="/q2/" element={<Question2 />} />
                <Route path="/routes" element={<SteroidRoutes />} />
                <Route path="/routes/oral" element={<Oral />} />
                <Route path="/routes/injection" element={<Injection />} />
                <Route path="/routes/inhaled" element={<Inhaled />} />
                <Route path="/routes/nasal" element={<Nasal />} />
                <Route path="/routes/topical" element={<Topical />} />
                <Route path="/routes/rectal" element={<Rectal />} />
                <Route path="/routes/eye" element={<Eye />} />
                <Route path="/end" element={<EndPage />} />
                <Route path="/sickdayrules" element={<SickDayRules />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </OralDosageValProvider>
        </UserAnswersProvider>
      </RouteCompletionProvider>
    </>
  );
}

export default App;
