import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import ResultsTable from "./pages/ResultsTable";
import Description from "./pages/Description";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
		<Route path="/results">
			<ResultsTable />
		</Route>
		<Route path="/description" exact>
			<Description />
		</Route>
		<Route path="/description/:id" component={Description}>
		</Route>
	</Switch>
);

export default App;
