import React, { Suspense, useEffect } from "react";
import "components/FontawsomeIcons";

import "./App.css";
// Import the new enhanced themes CSS
import "./enhanced-themes.css";

import Layout from "pages/_layouts/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "routes";
import PageNotFound from "pages/PageNotFound";
import Home from "pages/Home";

// Import our new theme wrapper
import ThemeWrapper from "components/ThemeWrapper";

function App() {
    return (
        // Wrap the entire application with ThemeProvider
        <ThemeWrapper>
            <Router>
                <Layout>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {routes.map((route) => (
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    key={route.path}
                                />
                            ))}

                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route>
                                <PageNotFound />
                            </Route>
                        </Switch>
                    </Suspense>
                </Layout>
            </Router>
        </ThemeWrapper>
    );
}

export default App;
