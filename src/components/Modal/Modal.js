import React from 'react';

const modal = (props) => {
    let matchModalInfo = props.matchModalInfo;
    return (
        <div className='modal fade show' id="winnerModal" tabIndex="-1" role="dialog" aria-labelledby="ModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">DECLARE WINNER</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                    <h3>{matchModalInfo.teamA} vs {matchModalInfo.teamB}</h3>
                    <div className="gameDate">14 Jul 2018, 14:00 (IST)</div>
                    <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Winner</label>
                        <select onChange={props.selectModalWinnerHandler} className="form-control" id="winner">
                            <option >Select Winner</option>
                            <option value="1">{matchModalInfo.teamA}</option>
                            <option value="2">{matchModalInfo.teamB}</option>
                            <option value="3"> Draw </option>
                        </select>
                    </div>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button onClick={props.setWinnerHandler} type="button" className="btn btn-primary">Update</button>
                </div>
                </div>
            </div>
            </div>  
    );
}

export default modal;