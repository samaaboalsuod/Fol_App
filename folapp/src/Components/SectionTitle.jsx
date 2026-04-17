import React from 'react';
import './SectionTitle.css';
import { CaretLeft } from "@phosphor-icons/react";

const SectionTitle = (props) => {
    return ( 
        <div className='sectionTitle'>
            <h2>{props.title}</h2>

            {/* This block only renders if props.more is provided */}
            {props.more && (
                <div className='moreCont'>
                    <p>{props.more}</p>
                    <CaretLeft size={16} weight="bold" color="#fafaeaa8" />
                </div>
            )}
        </div>
    );
}

export default SectionTitle;