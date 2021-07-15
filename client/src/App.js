import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Heading from "./pages/Heading";
import ResultsTable from "./pages/ResultsTable";

const App = () => (
	<div  className="container top-div">
		 <Heading />
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
				</Switch>
	</div>
);

export default App;
