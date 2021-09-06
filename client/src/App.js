import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Heading from "./pages/Heading";
import ResultsTable from "./pages/ResultsTable";
import Description from "./pages/Description";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GenerateDiv from "./pages/GenerateDiv";
import NewEnergiser from "./pages/NewEnergiser";
import ManageUsers from "./pages/ManageUsers";
import ResultsAdmin from "./pages/ResultsAdmin";
import Profile from "./pages/Profile";
import "./app.scss";


const App = () => (
	<div className="d-flex flex-column min-vh-100 justify-content-between">
		<Heading />
		<Switch>
			{/* <Route path="/" exact>
				<Home />
			</Route> */}
			<Route path="/" component={Home} exact></Route>
			<Route path="/about/this/site">
				<About />
			</Route>
			<Route path="/generate/" component={GenerateDiv}></Route>
			<Route path="/results/" component={ResultsTable}></Route>
			<Route path="/new/" component={NewEnergiser}></Route>
			<Route path="/description" component={Description}></Route>
			<Route path="/login/" component={Login}></Route>
			<Route path="/profile/" component={Profile}></Route>
			<Route path="/manageUsers/" component={ManageUsers}></Route>
			<Route path="/resultsAdmin/" component={ResultsAdmin}></Route>
			<Route path="/signup/" component={Signup}></Route>
		</Switch>
		<Footer />
	</div>
);

export default App;
