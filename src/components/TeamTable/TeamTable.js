import React from 'react';

const teamTable = (props) => (
    <table style={{width:"100%", textAlign:"center"}}>
        <thead>
            <tr>
                <th style={{borderRight:"1px solid #c9d2d7"}}>Name</th>
                <th>Address</th> 
            </tr>
        </thead>
        <tbody>
            {
                props.teamInfo.map(data => {
                    return (
                            <tr key={data.address}>
                                <td style={{borderRight:"1px solid #c9d2d7"}}>{data.name}</td>
                                <td>{data.address}</td> 
                            </tr>   
                            );
                })
            }   
        </tbody>
    </table>
)

export default teamTable;