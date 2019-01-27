import React from 'react';

// img
import ImgTeamA from '../../../assets/images/team-a.png';
import ImgTeamB from '../../../assets/images/team-b.png';
import ImgWinner from '../../../assets/images/winner.png';
import ImgEdit from '../../../assets/images/edit.png';

const match = (props) =>{
    let match = props.match;
    let matchWinner;
    let matchText;
    console.log("Props", props);

    if (match.winner == 0) {
        matchWinner = "active"; matchText = "ACTIVE";
    }
    else if(match.winner == 1 || match.winner == 2) {
        matchWinner = "closed"; matchText="WINNER DECLARED";
    }
    else if (match.winner == 3){
        matchWinner = "tied"; matchText ="TIED"
    }
    else {
        matchWinner = "cancelled"; matchText = "CANCELLED"
    }

    return(
    <div className="col-xl-4 col-md-12 col-lg-6">
        <div className={"list " + matchWinner + " shaddow"}>
            <div className="meta">
                <div className="gameDate">14 Jul 2018, 14:00 (IST)
                <span className="gameStatus">{matchText}</span></div>
            </div>
            <h3>{match.teamA} vs {match.teamB}</h3>
            <div className="gameTitle">
                <div className="col"><img src={ImgTeamA} alt=""/><h4>{match.teamA}<br/> <span style={{fontSize:"10px", wordWrap:"break-word"}}>{match.addressA}</span></h4></div>
                <div className="col"><img src={ImgTeamB} alt=""/><h4>{match.teamB}<br/> <span style={{fontSize:"10px", wordWrap:"break-word"}}>{match.addressB}</span></h4></div>
            </div>
            <div className="bet-amt">
                <div className="col">ETH {match.poolTeamA}</div>
                <div className="col">ETH {match.poolTeamB}</div>
            </div>

            <div className="action">
                <div className="col border-right">
                    <button onClick={()=>props.openMatchModal(match.address, match.teamA, match.teamB)} type="button" className="btn" data-toggle="modal" data-target="#winnerModal">
                        <img src={ImgWinner} alt=""/>
                    </button>
                </div>
                <div className="col">
                    <button href='edit-game.html' type="button" className="btn">
                        <img onClick={()=>props.cancelMatchHandler(match.address)} src={ImgEdit} alt=""/>
                    </button>
                </div>
            </div>                            
        </div>
    </div>
    );
}

export default match;