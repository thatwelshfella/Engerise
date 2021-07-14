import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import ResultsTable from "./pages/ResultsTable";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
		<Route path="/table">
			<ResultsTable />
		</Route>
	</Switch>
);

export default App;
