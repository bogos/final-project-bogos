import React from 'react';
import Match from './Match/Match'

const MatchesList = (props) =>{
    const matchListprops = props.matchList;
    const matchList = matchListprops.map( (match, index) =>
        <Match key={index} match = {match} openMatchModal={props.openMatchModal} cancelMatchHandler ={props.cancelMatchHandler}/>
    );

    return(
    <div className="row">
        {matchList}
    </div>
  );
}

export default MatchesList;