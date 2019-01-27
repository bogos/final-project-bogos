import React from 'react';

const gameDetails = (props) => (         
    <div className="row whitebox shaddow">
    <div className="col-xl-6">
        <div className="header">Game Details</div>

        <div className="form-group">
            <label htmlFor="tournament">Tournament</label>
            <select className="form-control" id="tournament">
                <option>Select</option>
                <option>IPL T20</option>
                <option>World Cup 2018</option>
                <option>Champions Trophy</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea onChange = {props.gameDetailsHandler} name="description" id="description" cols="5" rows="5" className="form-control"></textarea>
        </div>

        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input onChange = {props.gameDetailsHandler} name="date" id="date" placeholder="dd/mm/yyyy" className="form-control" required="" type="text" />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input onChange = {props.gameDetailsHandler} name="time" id="time" placeholder="00:00:00" className="form-control" required="" type="text" />
                </div>
            </div>
        </div>

        <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="commission">Commission (%)</label>
                        <input onChange = {props.gameDetailsHandler} name="commission" id="commission" placeholder="%" className="form-control" required="" type="text"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="status">Game Status</label>
                        <select className="form-control" id="status">
                            <option>Select</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
    </div>
</div> 
);

export default gameDetails;