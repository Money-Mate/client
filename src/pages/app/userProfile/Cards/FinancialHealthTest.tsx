import React, { useState } from 'react';
import { Checkbox, Slider } from 'antd';
// import 'antd/dist/antd.css';

type TrackingItem = {
  label: string;
  description: string;
  checked: boolean;
  percentage?: number;
};

const DEFAULT_TRACKING_ITEMS: TrackingItem[] = [
  {
    label: 'Schulden',
    description: '50-30-20 Regel: 20% in Schuldentilgung',
    checked: false,
  },
  {
    label: 'Eigene Budgets setzen',
    description: 'Alarmiere mich, wenn ich mein Budget überschreite',
    checked: false,
  },
  {
    label: '30-50-20 Regel',
    description: '30% für Leben, Wohnen, Essen, 50% für Spaß/freiwillige Ausgaben, 20% für Sparen',
    checked: false,
    percentage: 50,
  },
  {
    label: 'Notgroschen',
    description: '3 Monatsnettogehälter gespart, empfehlenswert ein extra Konto dafür anzulegen',
    checked: false,
  },
  {
    label: 'Weniger ausgeben als man verdient',
    description: '',
    checked: false,
  },
  {
    label: 'Goals Tracker',
    description: 'Auch für Abbezahlung Schulden, Kredite, Dispo',
    checked: false,
  },
  {
    label: 'Budget Tracker',
    description: 'Auswertung via Dashboard, Report, Alert',
    checked: false,
  },
];

const FinancialHealthTest = () => {
  const [trackingItems, setTrackingItems] = useState(DEFAULT_TRACKING_ITEMS);
  

  const handleCheckboxChange = (label: string) => {
    const updatedItems = trackingItems.map((item) => {
      if (item.label === label) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setTrackingItems(updatedItems);
  };

  const handleSliderChange = (label: string, value: number) => {
    const updatedItems = trackingItems.map((item) => {
      if (item.label === label) {
        return { ...item, percentage: value };
      }
      return item;
    });
    setTrackingItems(updatedItems);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tracking Items</h1>
      </header>
      <main>
        {trackingItems.map((item) => (
          <div key={item.label}>
            <Checkbox checked={item.checked} onChange={() => handleCheckboxChange(item.label)}>
              <span style={{ color: 'var(--mm-text-white)', fontWeight: 'bold' }}>{item.label}</span>
            </Checkbox>
            {item.checked && item.percentage !== undefined && (
              <Slider
                min={0}
                max={100}
                step={10}
                value={item.percentage}
                onChange={(value) => handleSliderChange(item.label, value)}
              />
            )}
            {item.checked && (
              <p style={{ color: 'var(--mm-text-dark)' }}>{item.description}</p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default FinancialHealthTest;