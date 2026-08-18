import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedTLRoute, GuestRoute } from './components/ProtectedRoute';
import TLLayout from './components/TLLayout';
import Login from './pages/Login';
import TLDashboard from './pages/TLDashboard';
import TLProjects from './pages/TLProjects';
import CreateEmployee from './pages/CreateEmployee';
import TLEmployees from './pages/TLEmployees';
import CreateTask from './pages/CreateTask';
import TLTasks from './pages/TLTasks';
import TLProfile from './pages/TLProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Ambient glassmorphism background glow shapes */}
          <div className="ambient-blob blob-1"></div>
          <div className="ambient-blob blob-2"></div>
          <div className="ambient-blob blob-3"></div>

          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: 'rgba(28, 18, 13, 0.95)',
                color: '#fff',
                border: '1px solid rgba(255, 170, 110, 0.3)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                fontFamily: 'var(--font-family)',
              },
            }}
          />

          <Routes>
            <Route 
              path="/login" 
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              } 
            />

            <Route 
              path="/tl" 
              element={
                <ProtectedTLRoute>
                  <TLLayout />
                </ProtectedTLRoute>
              }
            >
              <Route index element={<TLDashboard />} />
              <Route path="projects" element={<TLProjects />} />
              <Route path="employees" element={<TLEmployees />} />
              <Route path="create-employee" element={<CreateEmployee />} />
              <Route path="tasks" element={<TLTasks />} />
              <Route path="create-task" element={<CreateTask />} />
              <Route path="profile" element={<TLProfile />} />
              <Route path="*" element={<Navigate to="/tl" replace />} />
            </Route>

            <Route path="*" element={<Navigate to="/tl" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
