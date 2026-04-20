import React, { Component } from 'react';
import {Paperclip, PaperPlaneTilt} from '@phosphor-icons/react';

import './Chat.css';

const Chat = () => {
    return ( 
        <div className='chatCont'>

            <div className='chatMain'>

                <input type="text"  placeholder='اسأل عن ما تريد...' />
                <Paperclip size={24} color='#647C68' />
                
            </div>

            <div className='sendCircl'>
                <PaperPlaneTilt size={24} color='#FAFAEA' />
            </div>

        </div>
     );
}
 
export default Chat;