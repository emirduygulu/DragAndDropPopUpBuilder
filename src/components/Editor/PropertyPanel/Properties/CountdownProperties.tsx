import React, { useState } from 'react';
import { useBuilderStore } from '../../../../store/builderStore';
import type { BlockInstance } from '../../../../types';
import styles from './CountdownProperties.module.css';

interface CountdownPropertiesProps {
  block: BlockInstance;
}

export const CountdownProperties = ({ block }: CountdownPropertiesProps) => {
  const { updateBlockContent, updateBlockStyle } = useBuilderStore();
  const [showTimeSettings, setShowTimeSettings] = useState(false);
  
  // Get current values from block content or use defaults
  const format = block.content.format || 'dd:hh:mm:ss';
  const mode = block.content.mode || 'start';
  const duration = block.content.duration || {
    days: 0,
    hours: 0,
    minutes: 15,
    seconds: 0
  };
  const resetAfterEnd = block.content.resetAfterEnd || false;
  const resetDuration = block.content.resetDuration || {
    days: 1,
    unit: 'Days'
  };
  const sessionMode = block.content.sessionMode || 'next';
  const expirationDate = block.content.expirationDate ? new Date(block.content.expirationDate) : new Date();
  
  // Format date for datetime-local input
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Handle format change
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBlockContent(block.id, {
      ...block.content,
      format: e.target.value
    });
  };

  // Handle mode change
  const handleModeChange = (newMode: 'expiration' | 'start') => {
    updateBlockContent(block.id, {
      ...block.content,
      mode: newMode
    });
  };

  // Handle expiration date change
  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    updateBlockContent(block.id, {
      ...block.content,
      expirationDate: newDate.toISOString()
    });
  };

  // Handle duration change
  const handleDurationChange = (unit: 'days' | 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value, 10) || 0;
    updateBlockContent(block.id, {
      ...block.content,
      duration: {
        ...duration,
        [unit]: numValue
      }
    });
  };

  // Handle reset toggle
  const handleResetToggle = () => {
    updateBlockContent(block.id, {
      ...block.content,
      resetAfterEnd: !resetAfterEnd
    });
  };

  // Handle session mode change
  const handleSessionModeChange = (newMode: 'next' | 'after') => {
    updateBlockContent(block.id, {
      ...block.content,
      sessionMode: newMode
    });
  };

  // Handle reset duration change
  const handleResetDurationChange = (value: string) => {
    updateBlockContent(block.id, {
      ...block.content,
      resetDuration: {
        ...resetDuration,
        days: parseInt(value, 10) || 1
      }
    });
  };

  // Handle reset unit change
  const handleResetUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBlockContent(block.id, {
      ...block.content,
      resetDuration: {
        ...resetDuration,
        unit: e.target.value
      }
    });
  };

  // Handle style change
  const handleStyleChange = (property: string, value: string) => {
    updateBlockStyle(block.id, { [property]: value });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Countdown Settings</h3>
      
      {/* Time Settings Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowTimeSettings(true)}
          className="w-full py-2 px-4 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
          Time Settings
        </button>
      </div>

      {/* Format Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Display Format</label>
        <select
          value={format}
          onChange={handleFormatChange}
          className="w-full p-2 border rounded"
        >
          <option value="dd:hh:mm:ss">Days, Hours, Minutes, Seconds</option>
          <option value="hh:mm:ss">Hours, Minutes, Seconds</option>
          <option value="dd:hh:mm">Days, Hours, Minutes</option>
        </select>
      </div>

      {/* Visual Style */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Visual Style</label>
        <select
          value={block.content.style || 'standard'}
          onChange={(e) => updateBlockContent(block.id, { ...block.content, style: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="standard">Standard</option>
          <option value="flip">Flip Cards</option>
        </select>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={block.content.title || ''}
          onChange={(e) => updateBlockContent(block.id, { ...block.content, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Countdown Title"
        />
      </div>

      {/* Expiration Message */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Expiration Message</label>
        <input
          type="text"
          value={block.content.message || ''}
          onChange={(e) => updateBlockContent(block.id, { ...block.content, message: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Message when countdown ends"
        />
      </div>

      {/* Hide when expired */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="hideWhenExpired"
          checked={block.content.hideWhenExpired || false}
          onChange={(e) => updateBlockContent(block.id, { ...block.content, hideWhenExpired: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="hideWhenExpired" className="text-sm">Hide when expired</label>
      </div>

      {/* Styling Options */}
      <h4 className="text-md font-medium mb-2 mt-6">Styling Options</h4>
      
      {/* Number Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Number Color</label>
        <div className="flex">
          <input
            type="text"
            value={block.style.color || '#ffffff'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
            <input
              type="color"
              value={block.style.color || '#ffffff'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-12 h-12 -m-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Number Background Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Number Background Color</label>
        <div className="flex">
          <input
            type="text"
            value={block.content.numberBackgroundColor || '#ff6b00'}
            onChange={(e) => updateBlockContent(block.id, { ...block.content, numberBackgroundColor: e.target.value })}
            className="flex-grow p-2 border rounded"
          />
          <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
            <input
              type="color"
              value={block.content.numberBackgroundColor || '#ff6b00'}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, numberBackgroundColor: e.target.value })}
              className="w-12 h-12 -m-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Label Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Label Color</label>
        <div className="flex">
          <input
            type="text"
            value={block.content.labelColor || '#666666'}
            onChange={(e) => updateBlockContent(block.id, { ...block.content, labelColor: e.target.value })}
            className="flex-grow p-2 border rounded"
          />
          <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
            <input
              type="color"
              value={block.content.labelColor || '#666666'}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, labelColor: e.target.value })}
              className="w-12 h-12 -m-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Number Font Size</label>
        <div className="flex items-center">
          <input
            type="range"
            min="12"
            max="60"
            value={parseInt(block.style.fontSize || '24', 10)}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
            className="flex-grow mr-2"
          />
          <span className="w-12 text-center">{parseInt(block.style.fontSize || '24', 10)}px</span>
        </div>
      </div>

      {/* Label Font Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Label Font Size</label>
        <div className="flex items-center">
          <input
            type="range"
            min="8"
            max="24"
            value={parseInt(block.content.labelFontSize || '12', 10)}
            onChange={(e) => updateBlockContent(block.id, { ...block.content, labelFontSize: `${e.target.value}px` })}
            className="flex-grow mr-2"
          />
          <span className="w-12 text-center">{parseInt(block.content.labelFontSize || '12', 10)}px</span>
        </div>
      </div>

      {/* Border Radius */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Number Border Radius</label>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="20"
            value={parseInt(block.content.numberBorderRadius || '4', 10)}
            onChange={(e) => updateBlockContent(block.id, { ...block.content, numberBorderRadius: `${e.target.value}px` })}
            className="flex-grow mr-2"
          />
          <span className="w-12 text-center">{parseInt(block.content.numberBorderRadius || '4', 10)}px</span>
        </div>
      </div>

      {/* Time Settings Modal */}
      {showTimeSettings && (
        <div className={styles.timeSettingsModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Time settings</h2>
              <button 
                onClick={() => setShowTimeSettings(false)}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>

            {/* Format */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Format</label>
              <select
                value={format}
                onChange={handleFormatChange}
                className={styles.formControl}
              >
                <option value="HH:MM:SS">HH:MM:SS</option>
                <option value="DD:HH:MM:SS">DD:HH:MM:SS</option>
              </select>
            </div>

            {/* Mode */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Mode</label>
              
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    checked={mode === 'expiration'}
                    onChange={() => handleModeChange('expiration')}
                    className={styles.radioInput}
                  />
                  <span>Until the expiration date</span>
                </label>
                <p className={styles.helpText}>
                  The widget won't be shown after a certain date to any site visitor
                </p>
                
                {/* Expiration Date Picker - only show when expiration mode is selected */}
                {mode === 'expiration' && (
                  <div className="ml-5 mt-2">
                    <label className="block text-sm font-medium mb-1">Select Expiration Date and Time</label>
                    <input
                      type="datetime-local"
                      value={formatDateForInput(expirationDate)}
                      onChange={handleExpirationDateChange}
                      className="w-full p-2 border rounded bg-gray-100"
                    />
                  </div>
                )}
              </div>
              
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    checked={mode === 'start'}
                    onChange={() => handleModeChange('start')}
                    className={styles.radioInput}
                  />
                  <span>From the start of displaying</span>
                </label>
                <ul className={styles.helpList}>
                  <li>The countdown starts independently for each site visitor when the widget is shown</li>
                  <li>The timer updates for the site visitor if the cookie files are cleared in the browser</li>
                  <li>The widget will be closed after the timer countdown finishes</li>
                </ul>
              </div>
            </div>

            {/* Duration - only show when start mode is selected */}
            {mode === 'start' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Duration</label>
                <div className={styles.durationInputs}>
                  <input
                    type="text"
                    value={duration.days}
                    onChange={(e) => handleDurationChange('days', e.target.value)}
                    className={styles.durationInput}
                  />
                  <span>d</span>
                  <span>:</span>
                  <input
                    type="text"
                    value={duration.hours}
                    onChange={(e) => handleDurationChange('hours', e.target.value)}
                    className={styles.durationInput}
                  />
                  <span>h</span>
                  <span>:</span>
                  <input
                    type="text"
                    value={duration.minutes}
                    onChange={(e) => handleDurationChange('minutes', e.target.value)}
                    className={styles.durationInput}
                  />
                  <span>m</span>
                  <span>:</span>
                  <input
                    type="text"
                    value={duration.seconds}
                    onChange={(e) => handleDurationChange('seconds', e.target.value)}
                    className={styles.durationInput}
                  />
                  <span>s</span>
                </div>
              </div>
            )}

            {/* Reset Timer */}
            <div className={styles.formGroup}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="resetTimer"
                  checked={resetAfterEnd}
                  onChange={handleResetToggle}
                  className="mr-2"
                />
                <label htmlFor="resetTimer" className="text-sm font-medium">Reset the timer after the countdown ends</label>
              </div>
              
              {resetAfterEnd && (
                <div className={styles.resetOptions}>
                  <ul className={styles.helpList}>
                    <li>When the countdown ends, the widget will not be shown during the specified period</li>
                    <li>After that period, the widget will be shown again with the reset timer duration in accordance with the triggering settings</li>
                  </ul>
                  
                  <div className="mt-4">
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          checked={sessionMode === 'next'}
                          onChange={() => handleSessionModeChange('next')}
                          className={styles.radioInput}
                        />
                        <span>During the next session</span>
                      </label>
                    </div>
                    
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          checked={sessionMode === 'after'}
                          onChange={() => handleSessionModeChange('after')}
                          className={styles.radioInput}
                        />
                        <span>In</span>
                      </label>
                      <div className="inline-flex items-center ml-2">
                        <input
                          type="text"
                          value={resetDuration.days}
                          onChange={(e) => handleResetDurationChange(e.target.value)}
                          className={styles.durationInput}
                          disabled={sessionMode !== 'after'}
                        />
                        <select
                          value={resetDuration.unit}
                          onChange={handleResetUnitChange}
                          className="p-2 border rounded bg-gray-100 ml-2"
                          disabled={sessionMode !== 'after'}
                        >
                          <option value="Days">Days</option>
                          <option value="Hours">Hours</option>
                          <option value="Minutes">Minutes</option>
                        </select>
                        <span className="ml-2">after the end of the countdown</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className={styles.modalFooter}>
              <button
                onClick={() => setShowTimeSettings(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTimeSettings(false)}
                className={styles.submitButton}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 