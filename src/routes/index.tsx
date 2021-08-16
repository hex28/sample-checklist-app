import React, { Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Container from '../components/container';
import {AuthContextProvider, useAuthStore} from '../contexts/auth';
import {CheckListContextProvider} from '../contexts/checklist';


const Home = lazy(() => import('../views/home'));
const Login = lazy(()=> import('../views/login'));

const PrivateRoute = ({component: Component, ...rest}: any) => {

    const {state: {login}} = useAuthStore()

    return (
        <Route {...rest} render={props => (
            login ?
                <Component {...props} />
            : <Redirect to={'/login'} />
        )} />
    )
}

const IndexRouter = () => {

    return (
        <AuthContextProvider>
            <Router>
                <Container>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Switch>
                            <Route path="/login" exact component={Login} />
                            <CheckListContextProvider>
                                <PrivateRoute path="/" exact component={Home} />
                            </CheckListContextProvider>
                        </Switch>
                    </Suspense>
                </Container>
            </Router>
        </AuthContextProvider>
    )
}

export default IndexRouter;