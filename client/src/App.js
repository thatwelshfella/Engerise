import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Heading from "./pages/Heading";
import ResultsTable from "./pages/ResultsTable";
import Description from "./pages/Description";

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
		<Route path="/results" component={ResultsTable}>
		</Route>
		<Route path="/description" exact>
			<Description />
		</Route>
		<Route path="/description/:id" component={Description}>
		</Route>
	</Switch>
	</div>
);

export default App;
