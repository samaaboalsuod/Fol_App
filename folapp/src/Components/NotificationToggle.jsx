import React from 'react';
import './NotificationToggle.css';

const NotificationToggle = ({ title, subtitle, storageKey, value, onChange }) => {
    return (
        <div className='notification-toggle-row'>
            <div className='notification-toggle-text'>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>

            <label className='notification-switch'>
                <input
                    type='checkbox'
                    checked={value}
                    onChange={(e) => onChange(storageKey, e.target.checked)}
                />
                <span className='notification-slider'></span>
            </label>
        </div>
    );
};

export default NotificationToggle;
