import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Heading from "./pages/Heading";
import ResultsTable from "./pages/ResultsTable";
import Description from "./pages/Description";
import NewEnergiser from "./pages/NewEnergiser";
import "./app.scss";


const App = () => (
	<div className="d-flex flex-column min-vh-100 justify-content-between">
		<Heading />
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/about/this/site">
				<About />
			</Route>
			<Route path="/results/" component={ResultsTable}></Route>
      <Route path="/new/" component={NewEnergiser}>
		</Route>
			<Route path="/description" exact>
				<Description />
			</Route>
			<Route path="/description/:id" component={Description}></Route>
		</Switch>
		<Footer />
	</div>
);

export default App;
