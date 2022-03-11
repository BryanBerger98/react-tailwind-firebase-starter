import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './home/containers/Home';
import React from 'react';

const Signup = React.lazy(() => import('./auth/containers/Signup'));
const Signin = React.lazy(() => import('./auth/containers/Signin'));
const Account = React.lazy(() => import('./account/containers/Account'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={<Home />} />
          <Route path="/signup" element={
            <React.Suspense fallback={<>...</>}>
              <Signup />
            </React.Suspense>
          } />
          <Route path="/signin" element={
            <React.Suspense fallback={<>...</>}>
              <Signin />
            </React.Suspense>
          } />
          <Route path="/account" element={
            <React.Suspense fallback={<>...</>}>
              <Account />
            </React.Suspense>
          } />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
