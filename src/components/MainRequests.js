import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Requests from './Requests'
import Service from './Service'
import Brand from './Brand'
import Style from './Style'

const MainRequests = props => {
    return (
        <Router >
            <Requests >
                <Switch>
                    <Route path="/s-:token" component={Service} />

                    <Route
                        path="/b-:token"
                        component={Brand}
                    />
                    <Route
                        path="/st-:token"
                        component={Style}
                    />


                </Switch>
            </Requests>
        </Router>
    )
}

export default MainRequests