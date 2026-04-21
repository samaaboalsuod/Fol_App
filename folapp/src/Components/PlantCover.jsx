import React from 'react';
import { Pencil } from "@phosphor-icons/react";
import './PlantCover.css';

const PlantCover = ({ photo, nickname, species }) => {
    return (
        <section className='plantCover'>
            <div className='coverImgCont'>
                <img src={photo} alt={nickname} />
                
                <div className='coverOverlay'></div>

                <div className='editCircle'>
                    <Pencil size={24} weight="fill" color="#fff" />
                </div>

                <div className='coverTitles'>
                    <h1 className='plantNicknameTitle'>{nickname}</h1>
                    <h2 className='plantSpeciesTitle'>{species}</h2>
                </div>
            </div>
        </section>
    );
};

export default PlantCover;
