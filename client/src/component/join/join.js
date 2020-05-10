import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './join.css';
const Join = () => {
    // using hooks need to learn later
    const [name,setName] = useState(``);
    const [room,setRoom] = useState(``);

    return ( 
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className="heading">Join Room</h1>
                <div><input placeholder='Enter Name' className='joinInput' type='text' onChange={(event) => setName(event.target.value)} ></input></div>
                <div>
                <input placeholder='Enter Room' className='joinInput mt-20' type='text' onChange={(event) => setRoom(event.target.value)} ></input></div>
                <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} 
                to={`/chat?name=${name}&room=${room}`}>
                    <button className='button mt-20' type='submit'>submit</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;