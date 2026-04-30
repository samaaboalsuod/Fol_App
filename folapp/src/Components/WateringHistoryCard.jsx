import React from 'react';
import './WateringHistoryCard.css';

const WateringHistoryCard = ({ activities }) => {
    const formatDay = (dateStr) => {
        return new Intl.DateTimeFormat('ar-EG', { weekday: 'long' }).format(new Date(dateStr));
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <div className='whiteRoundCard'>
            {activities.length > 0 ? (
                activities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                        <div className="history-item">
                            <div className={`status-badge ${activity.Status === 'تم التنفيذ' ? 'completed' : 'missed'}`}>
                                {activity.Status === 'تم التنفيذ' ? 'تم الري' : 'لم يتم الري'}
                            </div>
                            <div className="history-date">{formatDate(activity.created_at)}</div>
                            <div className="history-day">{formatDay(activity.created_at)}</div>
                        </div>
                        {index < activities.length - 1 && <hr className='datastrap' />}
                    </React.Fragment>
                ))
            ) : (
                <p className="no-data">لا يوجد سجل حالياً</p>
            )}
        </div>
    );
};

export default WateringHistoryCard;
