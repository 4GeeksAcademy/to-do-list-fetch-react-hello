import React from "react";
import InputTask from './InputTask'
import Navbar from "./Navbar";


//create your first component
const Home = () => {
	
	return (
		<div className="principal">
			<div className="caja2">
				<img className="img" src="https://www.thespruce.com/thmb/eOuwYkllVBE97rMo1SB04bHDMbk=/4500x0/filters:no_upscale():max_bytes(150000):strip_icc()/organizing-a-to-do-list-2648011-hero-16c4949473354d57aab32e06a7cd619e.jpg" alt="imgenDeFond" />
			</div>
			<div className="contenido">
				<Navbar />
				<div className="container">
					<InputTask />
				</div>
				
			</div>
			
		</div>
	);
};

export default Home;
