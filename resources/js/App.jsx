import React, { Suspense, lazy } from 'react';

// Lazy load AppRoute
const AppRoute = lazy(() => import('./routes/AppRoute'));

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppRoute />
        </Suspense>
    );
}

export default App;
