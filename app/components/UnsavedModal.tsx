import React from 'react';

interface UnsavedModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UnsavedModal({
  isOpen,
  onConfirm,
  onCancel,
}: Readonly<UnsavedModalProps>) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Unsaved Changes</h2>
        <p>You have unsaved changes. Are you sure you want to leave?</p>
        <button onClick={onConfirm}>Leave</button>
        <button onClick={onCancel}>Stay</button>
      </div>
    </div>
  );
}
