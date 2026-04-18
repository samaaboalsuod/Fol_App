import React from 'react';
import './PlantCard.css';
import { Sun, Drop } from '@phosphor-icons/react';

const PlantCard = ({ plant }) => {
  // Direct links from your library
  const sunIconUrl = "https://otnuzlslyxxpczlmiytz.supabase.co/storage/v1/object/public/Assets/Icons/sun_icon.png";
  const waterIconUrl = "https://otnuzlslyxxpczlmiytz.supabase.co/storage/v1/object/public/Assets/Icons/water_icon.png";

  return (
    <div className="plant-card">

      <div className="card-photo-container">
        <img 
          src={plant.Plant_Details.Cover_Photo} 
          className="card-photo" 
          alt={plant.Nickname} 
        />
        <span className="health-tag">{plant["Health_Status(AR)"]}</span>
      </div>

      <div className="card-content">
        <h3 className="plant-nickname">
          {plant.Nickname || plant.Plant_Details.NameAR}
        </h3>

        <div className="stats-row">

          {/* Last Watered */}
          <div className="stat-item2">

            <div className="icon-circle water-bg">
              <Drop color="#4A8B60" size={24} />
            </div>

            <span className="stat-label">آخر سقاية</span>
            <span className="stat-value">{plant.displayWatering}</span>
          </div>

          {/* Lighting */}
          <div className="stat-item2">

            <div className="icon-circle sun-bg">
              <Sun color="#F4B942" size={24} />
            </div>

            <span className="stat-label">الإضاءة</span>
            <span className="stat-value">{plant.Plant_Details.Lighting}</span>
          </div>

        </div>

        <div className="divider"></div>

        <div className="next-watering-section">
          <span className="next-label">السقاية القادمة</span>
          <span className="next-value">بعد {plant.Plant_Details.Watering}</span>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;