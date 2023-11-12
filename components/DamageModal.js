import React from "react";

const DamageModal = ({ setIsModalOpen, damageRelations }) => {
  return (
    <div className="DamageModal">
      <div className="modal">
        <div className="modal-header">
          <span className="close-button" onClick={() => setIsModalOpen(false)}>
            X
          </span>
        </div>
        <div className="relation">
          <h2>Weak</h2>
        </div>
        <div className="relation">
          <h2>Resistant</h2>
        </div>
        <div className="relation">
          <h2>Immune</h2>
        </div>
      </div>
    </div>
  );
};

export default DamageModal;
