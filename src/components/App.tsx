import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import history from '../history';
import PostsList from '../containers/PostsList';
import PostShow from '../containers/PostShow/PostShow';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <h1>Header</h1>
                    <p>
                        <Link to={'/'}>Go to main</Link>
                    </p>
                    <Switch>
                        <Route path="/" exact component={PostsList} />
                        <Route path="/post" exact component={PostsList} />
                        <Route path="/post/:id" exact component={PostShow} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
