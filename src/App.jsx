import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './home/containers/Home';
import React from 'react';
import AuthGuard from './auth/guards/AuthGuard';

const Signup = React.lazy(() => import('./auth/containers/Signup'));
const Signin = React.lazy(() => import('./auth/containers/Signin'));
const ForgotPassword = React.lazy(() => import('./auth/containers/ForgotPassword'));
const AuthActions = React.lazy(() => import('./auth/containers/AuthActions'));
const Account = React.lazy(() => import('./account/containers/Account'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={<Home />} />
          <Route path="/signup" element={
            <AuthGuard mustBeAuthenticated={false}>
              <React.Suspense fallback={<>...</>}>
                <Signup />
              </React.Suspense>
            </AuthGuard>
          } />
          <Route path="/signin" element={
            <AuthGuard mustBeAuthenticated={false}>
              <React.Suspense fallback={<>...</>}>
                <Signin />
              </React.Suspense>
            </AuthGuard>
          } />
          <Route path="/forgot-password" element={
            <React.Suspense fallback={<>...</>}>
              <ForgotPassword />
            </React.Suspense>
          } />
          <Route path="/auth-actions" element={
            <React.Suspense fallback={<>...</>}>
              <AuthActions />
            </React.Suspense>
          } />
          <Route path="/account" element={
            <AuthGuard mustBeAuthenticated={true}>
              <React.Suspense fallback={<>...</>}>
                <Account />
              </React.Suspense>
            </AuthGuard>
          } />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
