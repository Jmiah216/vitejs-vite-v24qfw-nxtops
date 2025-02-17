import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { Layout } from './components/layout/Layout';
import { HomePage } from './components/HomePage';
import { EvaluationPage } from './components/pages/EvaluationPage';
import { ResumesPage } from './components/pages/ResumesPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="evaluation" element={
              <ProtectedRoute>
                <EvaluationPage />
              </ProtectedRoute>
            } />
            <Route path="resumes" element={
              <ProtectedRoute>
                <ResumesPage />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}