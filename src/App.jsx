/**
 *  App component
 *
 * This is the root component of the application.
 * It sets up global context providers for route completion,user answers and oral dosage values.
 * 
 * Routes are defined using React Router's BrowserRouter, Routes and Route components.
 * 
 * Routes are restricted into protected routes to prevent access via url ensuring proper logical flow is met.
 *  
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

/**
 *  Defined Routes:
 * "/" and "/start": Start page, the landing page of the app.
 * "/q1": Page for the first question.
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

// Route protection so users aren't able to access routes without visiting start first
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { PermissionProvider } from "./components/PermissionContext.jsx";

function App() {
  return (
    <>
      {/* Global context providers wrap the entire application,to pass values to children */}
      <RouteCompletionProvider>
        <UserAnswersProvider>
          <OralDosageValProvider>
            <BrowserRouter>
              {/* <PermissionProvider> */}
                <Routes>
                  {/* Public routes, can be accessed at any time */}
                  <Route index element={<Start />} />
                  <Route path="/start" element={<Start />} />
                 
                  {/* Protected routes, cant be accessed until start is visited */}
                  {/* <Route element={<ProtectedRoute />}> */}
                  <Route path="/q1" element={<Question1 />} />
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
                  {/* </Route> */}
                  {/* Fallback route incase of non existant route */}
                  <Route path="*" element={<NoPage />} />
                </Routes>
              {/* </PermissionProvider> */}
            </BrowserRouter>
          </OralDosageValProvider>
        </UserAnswersProvider>
      </RouteCompletionProvider>
    </>
  );
}

export default App;
