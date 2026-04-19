import React from 'react';
import './Filter.css';

const Filter = ({ activeFilter, setActiveFilter, options }) => {
    // Fallback to default options if none are provided
    const displayOptions = options || [
        { id: 'الكل', label: 'الكل' },
        { id: 'صحي', label: 'ممتاز' },
        { id: 'تحتاج للري', label: 'تحتاج عناية' },
        { id: 'تحتاج للضوء', label: 'جيد' }
    ];

    return (
        <div className="filter-wrapper">
            {displayOptions.map((option) => (
                <button
                    key={option.id}
                    className={`filter-pill ${activeFilter === option.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(option.id)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default Filter;