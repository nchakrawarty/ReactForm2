import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '../App';
import Profile from '../Profile';
import Setting from '../Setting';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={App} ></Route>
            <Route path="/profile" component={Profile} ></Route>
            <Route path="/setting" component={Setting} ></Route>
        </Switch>
    )
}