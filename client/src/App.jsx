import logo from "./assets/logo.svg";
import "./styles/global.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" height={200} width={200} />
				<h1 className="text-4xl font-bold">Dashboard</h1>
			</header>
		</div>
	);
}

export default App;
