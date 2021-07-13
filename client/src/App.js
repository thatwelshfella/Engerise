import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Description from "./pages/Description";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Description />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
	</Switch>
);

export default App;
