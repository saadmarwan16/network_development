import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { Provider } from 'react-redux'
import store from './store'

import './sass/main.scss'

const Login = lazy(() => import('./containers/Login'))
const Register = lazy(() => import('./containers/Register'))
const MoreAboutYou = lazy(() => import('./containers/MoreAboutYou'))
const SetPasswords = lazy(() => import('./containers/SetPasswords'))

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Suspense
					fallback={
						<div className="fallback">
							<Loader 
								type="Oval"
								color="#fff"
								height={40}
								width={40} 
							/>
						</div>
					}
				>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/register/more-about-you" component={MoreAboutYou} />
						<Route exact path="/register/set-passwords" component={SetPasswords} />
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	)
}

export default App