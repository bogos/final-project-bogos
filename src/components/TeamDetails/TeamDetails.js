import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const teamDetails = (props) => {
    return (
        <div className="row whitebox shaddow">
            <div className="col-xl-6">
                <div className="header">Team 1</div>

                <div className="form-group">
                    <label htmlFor="name1">Address Team</label>
                    <input onChange={props.gameDetailsHandler} name="name1" id="name1" className="form-control" required="" type="text"/>
                    <span>Copy the address of the teams here</span>

                </div>

                <div className="form-group">
                    <label htmlFor="logo1">Upload Team Image</label>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="logo1"/>
                        <label className="custom-file-label" htmlFor="logo1">No file selected.</label>
                    </div>
                </div>
                
                {/* <div className="form-group">
                    <label htmlFor="wallet1">Wallet Address</label>
                    <input name="wallet1" id="wallet1" className="form-control" required="" type="text"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="qr1">Upload QR Code Image</label>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="qr1"/>
                        <label className="custom-file-label" htmlFor="qr1">No file selected.</label>
                    </div>
                </div> */}
            </div>

            <div className="col-xl-6 m-top40">
                <div className="header">Team 2</div>

                <div className="form-group">
                    <label htmlFor="name2">Address Team</label>
                    <input onChange={props.gameDetailsHandler} name="name2" id="name2" className="form-control" required="" type="text"/>
                    <span>Copy the address of the teams here</span>
                </div>

                <div className="form-group">
                    <label htmlFor="logo2">Upload Team Image</label>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="logo2"/>
                        <label className="custom-file-label" htmlFor="logo2">No file selected.</label>
                    </div>
                </div>
                
                {/* <div className="form-group">
                    <label htmlFor="wallet2">Wallet Address</label>
                    <input name="wallet2" id="wallet1" className="form-control" required="" type="text"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="qr2">Upload QR Code Image</label>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="qr2"/>
                        <label className="custom-file-label" htmlFor="qr2">No file selected.</label>
                    </div>
                </div> */}
            </div>
            
            <div className="col-md-12 action-btn">
                <button type="button" className="btn btn-primary right30" 
                    onClick={()=>props.createMatchHandler(props.name1, props.name2, props.commission)}>
                    Save
                </button>
                <Link to="/"><button type="button" className="btn btn-default">Cancel</button></Link>
            </div>
            {props.children}
        </div>
    );
}
export default teamDetails;