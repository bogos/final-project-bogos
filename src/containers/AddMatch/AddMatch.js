import React, {Component} from 'react';
import GameDetails from '../../components/GameDetails/GameDetails';
import TeamDetails from '../../components/TeamDetails/TeamDetails';
import TeamCreate from '../../components/TeamCreate/TeamCreate';
import TeamTable from '../../components/TeamTable/TeamTable';

// Review
import GameManager from '../../contracts/GameManager';

import Spinner from '../../components/Spinner/Spinner';
import {withRouter} from 'react-router-dom';

class AddMatch extends Component{

    constructor(props){
        super(props);
        this.state = {
            // Create Team
            teamName: null,
            // Game Details
            description:"",
            date:"",
            time:"",
            commission:"",
            // Teams Details
            name1: "",
            name2: "",
            isLoading: true,

            // App State
            // gameListLoader : this.props.state.gameListLoader,
            teamInfo : this.props.state.arrTeamInfo,
            teamDictAddressName : this.props.state.teamDictAddressName,
            createMatch: false
        }        
    }
    // TODO:
    // -> Need a Service or Global component See REDUX
    componentDidMount = () => {

        // Set Game Manager
        window.gameManager = window.web3.eth.contract(GameManager.abi).at(this.props.state.gameManagerAddress);

        console.log("AR",this.props.state.arrTeamInfo.length);

        // if(this.props.state.arrTeamInfo.length === 0){
            this.getTeamAddressesNames();
        // } 
  
        // Global Events
		let filter = window.web3.eth.filter({
			fromBlock: 'latest',
			address: this.props.state.gameManagerAddress
		});
		
		filter.watch((err,res)=>{
			if(!err) {
                console.log("Filter Res", res);
                this.getTeamAddressesNames();
                if(this.state.createMatch){
                    // this.setState({gameListLoader: true});
                    this.props.history.push('/')
                }
			} else
			console.log(err);
        })
    }

    gameDetailsHandler = (event) => {
        let commission = 0;
        if(event.target.name === 'commission') {
            commission = event.target.value * 100;
            this.setState({commission: commission}, () =>  console.log(this.state.commission));
           
        } else {
            this.setState({[event.target.name]: event.target.value}, () => console.log(this.state));
        }        
    }

    // Create Transaction Obj
    createTransaction = (receptor) => {
        return {from: window.web3.eth.accounts[0], to: receptor};
    }

    // Create Match
	createMatchHandler = (teamA, teamB, commission) => {
        if(String(this.state.commission).length === 0 || isNaN(String(this.state.commission).length)){
            alert('Please dont forget the commision value');
            return;
        }
        this.setState({createMatch: false});

        // Create Transaction
        let tx = this.createTransaction(this.props.state.gameManagerAddress);
        // Send CreateMatch Transaction
		window.gameManager.createMatch.sendTransaction(teamA, teamB, commission, tx, (err,res) => {
            console.log(teamA, teamB, commission, tx);
			if(!err) {
                console.log("Game Created", res);
			} else{
                console.log(err);
            }
        });
        this.setState({createMatch: true});
        // this.setState({gameListLoader: true});
        // this.props.history.push('/')
    }


    // Get Team Addresses
    getTeamAddresseshandler  = () => {
        return new Promise((resolve, reject)=> {
            window.gameManager.getTeamAddresses.call((err,res) => err ? reject(err) : resolve(res));		
        });
    }

    getTeamAddressesNames = async () => {
        let arrAddresses = await this.getTeamAddresseshandler();
        if(arrAddresses.length === 0){
            this.setState({isLoading: false});
        } else {
            let teamInfo = [];
            let nameTeam = null;
    
            for(const address of arrAddresses){
                nameTeam = await new Promise((resolve, reject) => window.gameManager.teamsNames.call(address, (err, res) => err ? reject(err) : resolve(res)));
                teamInfo.push({address: address, name: nameTeam})
            }
            this.setState({teamInfo: teamInfo});
            this.setState({isLoading: false});
            console.log("Done getTeamAddressesNames!");
        }
    }

    // Create Team
    createTeam = (teamName) => {
        // Create Transaction
        this.setState({isLoading: true});
        let tx = this.createTransaction(this.props.state.gameManagerAddress);
        // Send createTeam Transaction
        window.gameManager.createTeam.sendTransaction(teamName, tx ,(err,res) => {
            if(!err) {
                console.log("Team created", res);
            } else {
                console.log(err);
            }
        })
    }

    render() {
        let teamTable = null;
        if(this.state.isLoading){
            teamTable = <div style={{display:"flex", justifyContent:"center", alignItems:"center",height: "100%"}} >
                            <Spinner />
                        </div>
        } else {
            if(this.props.state.arrTeamInfo.length === 0){
                teamTable = <div style={{display:"flex", justifyContent:"center", alignItems:"center",height: "100%"}} >
                                <div> No teams were created </div>
                            </div>
            } else {
                teamTable = <TeamTable teamInfo = {this.state.teamInfo}/>
            }
        }
        
        let matchSpinner = this.state.createMatch ? 
                            <div style={{display:"flex", justifyContent:"center", alignItems:"center",height: "100%", width:"100%"}} >
                                <Spinner />
                            </div> :
                            <div></div>
        return (
            <React.Fragment>            
            <div className="add-listing">
                <div className="row no-pad">
                    <div className="header">
                        <h2 className="title">Add New Game</h2>
                    </div>
                </div>
                <form action="" name="" method="post">
                        <TeamCreate 
                            gameDetailsHandler={this.gameDetailsHandler}
                            teamName = {this.state.teamName}
                            createTeam = {this.createTeam}
                            >
                        {/* Team Table */ 
                            teamTable
                        }
                        </TeamCreate>
                    
                    <GameDetails 
                        gameDetailsHandler={this.gameDetailsHandler}
                    />
                    <TeamDetails 
                        name1={this.state.name1} 
                        name2={this.state.name2}
                        commission = {this.state.commission}
                        gameCreatedLoader = {this.state.gameCreatedLoader}
                        gameDetailsHandler={this.gameDetailsHandler} 
                        createMatchHandler ={this.createMatchHandler }
                    >
                        {matchSpinner}
                    </TeamDetails>
                </form>
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(AddMatch);