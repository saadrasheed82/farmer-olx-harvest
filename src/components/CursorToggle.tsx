import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CursorToggleProps {
  className?: string;
}

const CursorToggle: React.FC<CursorToggleProps> = ({ className = '' }) => {
  // Get initial state from localStorage or default to true
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('customCursorEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Update body class and localStorage when toggle changes
  useEffect(() => {
    if (isEnabled) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    
    localStorage.setItem('customCursorEnabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch 
        id="cursor-mode" 
        checked={isEnabled}
        onCheckedChange={setIsEnabled}
      />
      <Label htmlFor="cursor-mode" className="text-sm cursor-pointer">
        {isEnabled ? 'Custom Cursor: On' : 'Custom Cursor: Off'}
      </Label>
    </div>
  );
};

export default CursorToggle;