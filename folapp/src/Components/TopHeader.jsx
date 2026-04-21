import React from 'react';
import { CaretLeft, ShareFat } from "@phosphor-icons/react";
import './TopHeader.css';

const TopHeader = ({ onBack, onShare }) => {
    return (
        <section className='detail-header'>
            <div className="header-right" onClick={onShare}>
                <ShareFat size={28} color='#FAFAEA' />
            </div>
            <div className="header-left" onClick={onBack}>
                <CaretLeft size={28} color='#FAFAEA' />
            </div>
        </section>
    );
};

export default TopHeader;
