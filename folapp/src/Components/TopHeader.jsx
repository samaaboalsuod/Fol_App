import React from 'react';
import { CaretLeft, ShareFat, X } from "@phosphor-icons/react";
import './TopHeader.css';

import Logo from '../Assets/logo.svg';

const TopHeader = ({ onBack, onShare, showLogo = false, hideShare = false, isClose = false }) => {
    return (
        <section className='detail-header'>
            <div className="header-right">
                {showLogo ? (
                    <img src={Logo} alt="Logo" />
                ) : (
                    !hideShare && <ShareFat size={28} color='#FAFAEA' onClick={onShare} />
                )}
            </div>
            <div className="header-left" onClick={onBack}>
                {isClose ? <X size={28} color='#FAFAEA' /> : <CaretLeft size={28} color='#FAFAEA' />}
            </div>
        </section>
    );
};

export default TopHeader;
