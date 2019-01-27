import React from 'react';

const teamCreate = (props) => (         
    <React.Fragment>
        <div className="row whitebox shaddow">
            <div className="col-xl-6">
                <div className="header">Create Team</div>
                <div className="form-group">
                    <label htmlFor="teamName">Team Name</label>
                    <input onChange={props.gameDetailsHandler} name="teamName" id="teamName" className="form-control" required="" type="text"/>
                </div>    
                <div className="col-md-12 action-btn">
                    <button type="button" className="btn btn-primary right30" onClick={()=>props.createTeam(props.teamName)}>Create</button>
                </div>
            </div>
            <div className="col-xl-6">
                {props.children}
            </div>
        </div>
    </React.Fragment>
);

export default teamCreate;