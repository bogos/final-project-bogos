import React, { Component } from 'react';
import MatchList from '../../components/MatchList/MatchList';

class Dashboard extends Component{

    render () {
        return (
            <React.Fragment>
                    <div className="game-listing">
                        <div className="row no-pad">
                            <div className="header">
                            <h2 className="title">Game List</h2>
                            </div>
                        </div>

                        <MatchList 
                            matchList={this.props.matchList}
                            openMatchModal = {this.props.openMatchModal}
                            cancelMatchHandler = {this.props.cancelMatchHandler}
                        />

                        <div className="row text-center top30">
                            <button className="btn btn-primary" type="submit">Load More</button>
                        </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;