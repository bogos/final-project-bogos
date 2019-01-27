import React, { Component } from 'react';

// Scripts
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js'
import 'bootstrap/dist/js/bootstrap.js';

// Dapp
import Web3 from 'web3';
import GameManager from './contracts/GameManager';
import Match from './contracts/Match';

// Components - Containers
import Dashboard from './containers/Dashboard/Dashboard';
import AddMatch from './containers/AddMatch/AddMatch';
import Layout from './components/Layout/Layout';
import Modal from './components/Modal/Modal';

import Spinner from './components/Spinner/Spinner';

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			gameManagerAddress : "0x3dcc8114a03cc87f9dd93e0a405385fe89d1f88c",
			activeMatches: [],
			teamDictAddressName: [],

			matchModalInfo: {
				address: "",
				teamA: "",
				teamB: "",			
				winner: "",
			},
			name1: "",
			name2: "",
			isSideBarOpen: false,
			
			// Test
			teamAddressesNames: [],
			arrTeamInfo: [],

			gameListLoader : true,
			gameCreatedLoader: false,
		}
	}
	
	componentDidMount = () => {
		// Metamask Injection
		if (typeof window.web3 !== 'undefined') {
			window.web3 =  new Web3(window.web3.currentProvider);
		} else {
			alert("Please install Metamask :)");
		}
		
		// Set Global "Game Manager Contract"
		window.gameManager = window.web3.eth.contract(GameManager.abi).at(this.state.gameManagerAddress);
		
		console.log(window.gameManager);

		// Data Refresh
		if(this.state.activeMatches.length === 0){
			this.refreshDashboardHandler();
		}

		// Global Events
		var filter = window.web3.eth.filter({
			fromBlock: 'latest',
			address: this.state.gameManagerAddress
		});
		
		filter.watch((err,res)=>{
			if(!err) {
				console.log("Event Refresh DashBoard",res);
				this.refreshDashboardHandler();
			} else
			console.log(err);
		})

		// SetBetEvent
		let hash = window.web3.sha3("BetSet(address,address,address)"); // 0xa232bdf5a726d5d6e5094f23b42209978334eee84ce0f1ec5017e649040ae82c
		let filterBetSet = window.web3.eth.filter({
            fromBlock: 'latest',
            topics: [hash]
        });

		filterBetSet.watch((err,res)=>{
            if(!err) {
				console.log("Testeando", res);
				// this.getMatchDataHandler();
				this.refreshDashboardHandler();
            } else
            console.log(err);
        })

		// var filterBetSet = window.web3.eth.filter({
        //     fromBlock: 'latest',
        //     topics: ["0x0b4a0034fc68fe1c2cb7f3664faea91b711a2751770aad6d305ad1bada4eade6"]
        // });
		
        // filterBetSet.watch((err,res)=>{
        //     if(!err) {
		// 		console.log("OTRO", res);
		// 		// this.getMatchDataHandler();
		// 		// this.refreshDashboardHandler();
        //     } else
        //     console.log(err);
        // })
	}
	
	getActiveMatchesHandler = () => {
		return new Promise((resolve, reject)=> {
			window.gameManager.getActiveMatches.call((err,res) => err ? reject(err) : resolve(res));		
		});
	}

	getAllMatchesHandler = () => {
		return new Promise((resolve, reject)=> {
			window.gameManager.getAllMatches.call((err,res) => err ? reject(err) : resolve(res));		
		});
	}

	// Teams
	// Get Team Addresses
	getTeamAddressesHandler  = () => {
		return new Promise((resolve, reject)=> {
			window.gameManager.getTeamAddresses.call((err,res) => err ? reject(err) : resolve(res));		
		});
	}

	getTeamAddressesNames = async () => {
		let arrAddresses = await this.getTeamAddressesHandler();
		let objTeamInfo = {};
		let arrTeamInfo = [];
		let nameTeam = null;

		for(const address of arrAddresses){
			nameTeam = await new Promise((resolve, reject) => window.gameManager.teamsNames.call(address, (err, res) => err ? reject(err) : resolve(res)));
			objTeamInfo[address] = nameTeam;
			arrTeamInfo.push({address: address, name: nameTeam});
		}
		this.setState({arrTeamInfo: arrTeamInfo})
		return objTeamInfo;
		console.log("Done getTeamAddressesNames!");
    }   

	async refreshDashboardHandler() {
		// All active matches without first element
		//let [, ...arrMatches] = await this.getActiveMatchesHandler();

		// All matches
		let arrMatches = await this.getAllMatchesHandler();

		// Dict [Address] => Name
		let teamDictAddressName = await this.getTeamAddressesNames();

		console.log("Matches",arrMatches);
		if(arrMatches.length === 0){
			this.setState({activeMatches: []});
			this.setState({gameListLoader: false})
		} else {
			let match = null;
			let infoMatch = null;
			let fullMatches = [];
			for(const matchAddress of arrMatches) {
				let data = {teamA: "",teamB: "",addressA:"",addressB: "",poolTeamA: 0,poolTeamB: 0, address: "", winner:"", fee:0}
				match = window.web3.eth.contract(Match.abi).at(matchAddress);
				infoMatch = await new Promise((resolve, reject) => match.getMatch.call((err, res) => err ? reject(err) : resolve(res)));
				// console.log("138: infoMatch", infoMatch);

				// Set Data
				data.teamA = teamDictAddressName[infoMatch[0]];
				data.teamB = teamDictAddressName[infoMatch[1]];
				data.addressA = infoMatch[0];
				data.addressB = infoMatch[1];
				data.poolTeamA = window.web3.fromWei(infoMatch[2], "ether").toString();
				data.poolTeamB = window.web3.fromWei(infoMatch[3], "ether").toString();
				data.address = matchAddress;
				// data.winner = window.web3.fromWei(infoMatch[4], "ether").toString();
				data.winner = window.web3.fromWei(infoMatch[4], "wei").toString();
				data.fee = infoMatch[5]; 

				console.log("DATA", data);
				// Push data
				fullMatches.push(data);
			}
			console.log("FULLMATCHES", fullMatches);
			this.setState({activeMatches: fullMatches});

			// Set GameList Loader False
			this.setState({gameListLoader: false})
			console.log("Done Refresh!");
		}
	}

	openMatchModalHandler = (address, teamA, teamB, winner) => {
		this.setState({
			matchModalInfo: {
				address: address,
				teamA: teamA,
				teamB: teamB,
				winner: winner
			}
		})
	}

	selectModalWinnerHandler = (event) => {
		let currentmatchModalInfo = {...this.state.matchModalInfo, winner: event.target.value};
		console.log(currentmatchModalInfo);
		this.setState({matchModalInfo: currentmatchModalInfo})
	}
	
	setWinnerHandler = (address) =>{
		console.log(this.state.matchModalInfo);
		// TODO: VALIDATE THE POOLS ARE NOT 0 
		let winner = this.state.matchModalInfo.winner;
		if (winner != null) {
			let sender = window.web3.eth.accounts[0];
			let receiver = this.state.gameManagerAddress;
			let tx = {
				from:sender,
				to:receiver, 
			}
			if(this.state.matchModalInfo.winner != 3){
				window.gameManager.burnMatch.sendTransaction(this.state.matchModalInfo.address, winner, tx, (err,res) => {
					if(!err) {
						console.log("Entre", res);
						this.refreshDashboardHandler();
					} else
					console.log(err);
				});
			} else {
				window.gameManager.finishMatch.sendTransaction(this.state.matchModalInfo.address, winner, tx, (err, res) => {
					if(!err) {
						console.log("Draw", res);
						this.refreshDashboardHandler();
					} else
					console.log(err);
				});
			}
		}
	}

	cancelMatchHandler = (address) =>{
		// TODO: VALIDATE THE POOLS ARE NOT 0 
		let sender = window.web3.eth.accounts[0];
		let receiver = this.state.gameManagerAddress;
		let tx = {
			from:sender,
			to:receiver, 
		}
		window.gameManager.finishMatch.sendTransaction(address, 4, tx, (err,res) => {
			if(!err) {
				console.log("Entre", res);
				this.refreshDashboardHandler();
			} else
			console.log(err);
		});
	
	}

	sidebarOpenHandler = ()=>{
		let isSideBarOpen = this.state.isSideBarOpen;
		this.setState({isSideBarOpen: !isSideBarOpen});
	}

	render() {
		let gameList = null;

		if(this.state.gameListLoader){
			gameList = <div style={{display:"flex", justifyContent:"center", alignItems:"center",height: "100%"}} >
							<Spinner />
						</div>
		} else {
			if(this.state.activeMatches.length === 0){
				gameList = <div style={{textAlign:"center"}}> No games were created</div>
			} else {
				gameList = <Dashboard
								sidebarOpen = {this.sidebarOpen}
								matchList={this.state.activeMatches}
								openMatchModal = {this.openMatchModalHandler}
								cancelMatchHandler = {this.cancelMatchHandler}
								refreshDashboardHandler = {this.refreshDashboardHandler}
							/>
			}
		}

		return (
			<React.Fragment>
				<div className="wrapper">
					<Router>
						<Layout
							isSideBarOpen = {this.state.isSideBarOpen} 
							sidebarOpenHandler = {this.sidebarOpenHandler}
						>
							<Route path="/" exact render = { (props) =>
								{  
									return gameList;
								}
							}
							/>
							<Route path="/addGame" render = { (props) =>
								<AddMatch
									state = {this.state}
								/>
							}
							/>
						</Layout>
					</Router>
				</div>
				<Modal matchModalInfo={this.state.matchModalInfo} selectModalWinnerHandler={this.selectModalWinnerHandler} setWinnerHandler={this.setWinnerHandler}/>
			</React.Fragment>
		);
	}
}
export default App;
