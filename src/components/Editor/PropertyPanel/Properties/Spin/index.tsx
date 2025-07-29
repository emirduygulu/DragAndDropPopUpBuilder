import React, { useState } from 'react';
import { useBuilderStore } from '../../../../../store/builderStore';
import type { BlockInstance, SpinWheelSlice, SpinWheelSettings, SpinWheelFormField } from '../../../../../types';
import styles from './spinWheelProperties.module.css';

interface SpinWheelPropertiesProps {
  block: BlockInstance;
}

export const SpinWheelProperties = ({ block }: SpinWheelPropertiesProps) => {
  const { updateBlockContent } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'logos' | 'form' | 'text' | 'rewards' | 'colors' | 'placement'>('logos');
  
  const settings: SpinWheelSettings = block.content.settings || {
    layout: {
      desktop: { width: 800, height: 600, wheelPosition: 'left', wheelSize: 300 },
      mobile: { width: 400, height: 700, wheelPosition: 'top', wheelSize: 250 }
    },
    colorTheme: {
      container: { backgroundColor: '#0077CB', textColor: '#FFFFFF' },
      submitButton: { backgroundColor: '#FC8289', textColor: '#FFFFFF' },
      wheelSlices: [
        { backgroundColor: '#F2EBCD', textColor: '#000000' },
        { backgroundColor: '#57413A', textColor: '#FFFFFF' },
        { backgroundColor: '#9CCDC3', textColor: '#000000' },
        { backgroundColor: '#FC8289', textColor: '#000000' }
      ],
      countdownBar: { backgroundColor: '#0077CB', textColor: '#FFFFFF' }
    },
    texts: {
      headline: 'Our store\'s special bonus unlocked!',
      description: 'You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.',
      disclaimer: 'You can spin the wheel only once.\nIf you win, coupon can be claimed for 15 mins only!\nSame email must be used when ordering.',
      submitButton: 'TRY YOUR LUCK',
      closeLink: 'No, I don\'t feel lucky',
      winningHeadline: 'Hurrah! You\'ve hit [coupon]. Lucky day!',
      losingHeadline: 'Better luck next time!',
      winningMessage: 'Congratulations! You won:',
      losingMessage: 'Sorry, try again next time!'
    },
    formFields: [
      { name: 'fullName', type: 'text', label: 'Your full name', placeholder: 'Enter your full name', show: false, required: false },
      { name: 'email', type: 'email', label: 'Your email address', placeholder: 'Enter your email', show: true, required: true },
      { name: 'phone', type: 'phone', label: 'Your phone number', placeholder: 'Enter your phone', show: false, required: false },
      { name: 'city', type: 'text', label: 'Your city', placeholder: 'Enter your city', show: false, required: false },
      { name: 'zipCode', type: 'text', label: 'Your ZIP code', placeholder: 'Enter ZIP code', show: false, required: false }
    ],
    validateEmails: false,
    preventEmailDuplicates: false,
    consentCheckbox: {
      show: false,
      text: 'I do wish to accept discounts and marketing offers to be sent to my email address.'
    },
    sliceCount: 8,
    borderWidth: 2,
    borderColor: '#000000',
    borderStyle: 'solid',
    spinDuration: 4000,
    spinEasing: 'ease-out',
    spinLimit: 'once',
    triggerType: 'button',
    triggerDelay: 5,
    showOnDesktop: true,
    showOnMobile: true,
    showOnExit: false,
    showToSameUser: 'once'
  };
  
  const slices: SpinWheelSlice[] = block.content.slices || [];
  
  const handleSettingsChange = (key: keyof SpinWheelSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    updateBlockContent(block.id, { ...block.content, settings: newSettings });
  };
  
  const handleSliceChange = (index: number, key: keyof SpinWheelSlice, value: any) => {
    const newSlices = [...slices];
    newSlices[index] = { ...newSlices[index], [key]: value };
    updateBlockContent(block.id, { ...block.content, slices: newSlices });
  };
  
  const addSlice = () => {
    if (slices.length >= 20) return;
    
    const newSlice: SpinWheelSlice = {
      id: `slice_${Date.now()}`,
      text: 'New Slice',
      value: 'NEW_SLICE',
      probability: 10,
      type: 'win',
      color: '#FFFFFF',
      backgroundColor: '#3b82f6',
      isActive: true
    };
    
    updateBlockContent(block.id, { 
      ...block.content, 
      slices: [...slices, newSlice] 
    });
  };
  
  const removeSlice = (index: number) => {
    const newSlices = slices.filter((_, i) => i !== index);
    updateBlockContent(block.id, { ...block.content, slices: newSlices });
  };
  
  const handleFormFieldChange = (index: number, key: keyof SpinWheelFormField, value: any) => {
    const newFormFields = [...settings.formFields];
    newFormFields[index] = { ...newFormFields[index], [key]: value };
    handleSettingsChange('formFields', newFormFields);
  };
  
  const totalProbability = slices.filter(s => s.isActive && s.type === 'win').reduce((sum, slice) => sum + slice.probability, 0);
  
  return (
    <div className={styles.container}>
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'logos' ? styles.active : ''}`}
          onClick={() => setActiveTab('logos')}
        >
          <span className={styles.tabIcon}>⭐</span>
          Your logos
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'form' ? styles.active : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <span className={styles.tabIcon}>✏️</span>
          Form fields
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'text' ? styles.active : ''}`}
          onClick={() => setActiveTab('text')}
        >
          <span className={styles.tabIcon}>📝</span>
          Edit text
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'rewards' ? styles.active : ''}`}
          onClick={() => setActiveTab('rewards')}
        >
          <span className={styles.tabIcon}>🎁</span>
          Rewards
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'colors' ? styles.active : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          <span className={styles.tabIcon}>🎨</span>
          Color theme
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'placement' ? styles.active : ''}`}
          onClick={() => setActiveTab('placement')}
        >
          <span className={styles.tabIcon}>📍</span>
          Placement
        </button>
      </div>
      
      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'logos' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Your logos</h3>
            
            <div className={styles.formGroup}>
              <label>Big logo (.PNG)</label>
              <div className={styles.uploadArea}>
                <input
                  type="text"
                  placeholder="Upload PNG image (380 x 80px)"
                  value={settings.bigLogo || ''}
                  onChange={(e) => handleSettingsChange('bigLogo', e.target.value)}
                  className={styles.input}
                />
                <button className={styles.uploadButton}>Upload</button>
              </div>
              {settings.bigLogo && (
                <div className={styles.preview}>
                  <img src={settings.bigLogo} alt="Big logo preview" />
                </div>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>Small logo (.PNG)</label>
              <div className={styles.uploadArea}>
                <input
                  type="text"
                  placeholder="Upload PNG image (180 x 180px)"
                  value={settings.smallLogo || ''}
                  onChange={(e) => handleSettingsChange('smallLogo', e.target.value)}
                  className={styles.input}
                />
                <button className={styles.uploadButton}>Upload</button>
              </div>
              {settings.smallLogo && (
                <div className={styles.preview}>
                  <img src={settings.smallLogo} alt="Small logo preview" />
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'form' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Form fields</h3>
            
            {settings.formFields.map((field, index) => (
              <div key={field.name} className={styles.formFieldItem}>
                <div className={styles.formFieldHeader}>
                  <span className={styles.fieldName}>{field.label}</span>
                  <div className={styles.fieldToggles}>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={field.show}
                        onChange={(e) => handleFormFieldChange(index, 'show', e.target.checked)}
                      />
                      <span className={styles.toggleLabel}>SHOW</span>
                    </label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFormFieldChange(index, 'required', e.target.checked)}
                      />
                      <span className={styles.toggleLabel}>REQUIRED</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
            
            <div className={styles.formGroup}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.validateEmails}
                  onChange={(e) => handleSettingsChange('validateEmails', e.target.checked)}
                />
                <span>Validate collected emails</span>
              </label>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.preventEmailDuplicates}
                  onChange={(e) => handleSettingsChange('preventEmailDuplicates', e.target.checked)}
                />
                <span>Prevent email duplicates</span>
              </label>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.consentCheckbox.show}
                  onChange={(e) => handleSettingsChange('consentCheckbox', { 
                    ...settings.consentCheckbox, 
                    show: e.target.checked 
                  })}
                />
                <span>Display an opt-in consent checkbox</span>
              </label>
              {settings.consentCheckbox.show && (
                <textarea
                  value={settings.consentCheckbox.text}
                  onChange={(e) => handleSettingsChange('consentCheckbox', { 
                    ...settings.consentCheckbox, 
                    text: e.target.value 
                  })}
                  className={styles.textarea}
                  rows={3}
                />
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'text' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Edit text</h3>
            
            <div className={styles.formGroup}>
              <label>Font Family</label>
              <select className={styles.select}>
                <option>Select Font Family</option>
                <option>Arial</option>
                <option>Helvetica</option>
                <option>Times New Roman</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Promotion headline</label>
              <input
                type="text"
                value={settings.texts.headline}
                onChange={(e) => handleSettingsChange('texts', { 
                  ...settings.texts, 
                  headline: e.target.value 
                })}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Promotion description</label>
              <textarea
                value={settings.texts.description}
                onChange={(e) => handleSettingsChange('texts', { 
                  ...settings.texts, 
                  description: e.target.value 
                })}
                className={styles.textarea}
                rows={3}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Promotion disclaimer</label>
              <textarea
                value={settings.texts.disclaimer}
                onChange={(e) => handleSettingsChange('texts', { 
                  ...settings.texts, 
                  disclaimer: e.target.value 
                })}
                className={styles.textarea}
                rows={4}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Submit button</label>
              <input
                type="text"
                value={settings.texts.submitButton}
                onChange={(e) => handleSettingsChange('texts', { 
                  ...settings.texts, 
                  submitButton: e.target.value 
                })}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Close link</label>
              <input
                type="text"
                value={settings.texts.closeLink}
                onChange={(e) => handleSettingsChange('texts', { 
                  ...settings.texts, 
                  closeLink: e.target.value 
                })}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Winning headline</label>
              <input
                type="text"
                value={settings.texts.winningHeadline}
                onChange={(e) => handleSettingsChange('texts', { 
                  ...settings.texts, 
                  winningHeadline: e.target.value 
                })}
                className={styles.input}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'rewards' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Rewards</h3>
              <button onClick={addSlice} className={styles.addButton} disabled={slices.length >= 20}>
                + Add Slice
              </button>
            </div>
            
            <div className={styles.rewardsInfo}>
              There's a fixed number of 6 winning and 6 losing wheel slices. You can set the chance for each winning slice, while losing slices exist only to make people happy even if they win the smallest reward.
            </div>
            
            {totalProbability !== 100 && totalProbability > 0 && (
              <div className={styles.warning}>
                ⚠️ Total winning probability: {totalProbability}%. Should be 100%.
              </div>
            )}
            
            <div className={styles.rewardsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.headerCell}>ACTIVE</div>
                <div className={styles.headerCell}>LOSING</div>
                <div className={styles.headerCell}>REWARD LABEL</div>
                <div className={styles.headerCell}>COUPON CODE / URL</div>
                <div className={styles.headerCell}>CHANCE</div>
              </div>
              
              {slices.map((slice, index) => (
                <div key={slice.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <input
                      type="checkbox"
                      checked={slice.isActive}
                      onChange={(e) => handleSliceChange(index, 'isActive', e.target.checked)}
                    />
                  </div>
                  <div className={styles.tableCell}>
                    <input
                      type="checkbox"
                      checked={slice.type === 'lose'}
                      onChange={(e) => handleSliceChange(index, 'type', e.target.checked ? 'lose' : 'win')}
                    />
                  </div>
                  <div className={styles.tableCell}>
                    <input
                      type="text"
                      value={slice.text}
                      onChange={(e) => handleSliceChange(index, 'text', e.target.value)}
                      className={styles.tableInput}
                    />
                  </div>
                  <div className={styles.tableCell}>
                    <input
                      type="text"
                      value={slice.value}
                      onChange={(e) => handleSliceChange(index, 'value', e.target.value)}
                      className={styles.tableInput}
                      placeholder={slice.type === 'lose' ? 'Losing Slice' : 'Coupon code or URL'}
                    />
                  </div>
                  <div className={styles.tableCell}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={slice.probability}
                      onChange={(e) => handleSliceChange(index, 'probability', parseInt(e.target.value) || 0)}
                      className={styles.tableInput}
                      disabled={slice.type === 'lose'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'colors' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Color theme</h3>
            
            <div className={styles.colorGroup}>
              <label>Container</label>
              <div className={styles.colorInputs}>
                <div className={styles.colorInput}>
                  <span>Background:</span>
                  <input
                    type="color"
                    value={settings.colorTheme.container.backgroundColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      container: { ...settings.colorTheme.container, backgroundColor: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    value={settings.colorTheme.container.backgroundColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      container: { ...settings.colorTheme.container, backgroundColor: e.target.value }
                    })}
                    className={styles.colorText}
                  />
                </div>
                <div className={styles.colorInput}>
                  <span>Text:</span>
                  <input
                    type="color"
                    value={settings.colorTheme.container.textColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      container: { ...settings.colorTheme.container, textColor: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    value={settings.colorTheme.container.textColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      container: { ...settings.colorTheme.container, textColor: e.target.value }
                    })}
                    className={styles.colorText}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.colorGroup}>
              <label>Submit button</label>
              <div className={styles.colorInputs}>
                <div className={styles.colorInput}>
                  <span>Background:</span>
                  <input
                    type="color"
                    value={settings.colorTheme.submitButton.backgroundColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      submitButton: { ...settings.colorTheme.submitButton, backgroundColor: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    value={settings.colorTheme.submitButton.backgroundColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      submitButton: { ...settings.colorTheme.submitButton, backgroundColor: e.target.value }
                    })}
                    className={styles.colorText}
                  />
                </div>
                <div className={styles.colorInput}>
                  <span>Text:</span>
                  <input
                    type="color"
                    value={settings.colorTheme.submitButton.textColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      submitButton: { ...settings.colorTheme.submitButton, textColor: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    value={settings.colorTheme.submitButton.textColor}
                    onChange={(e) => handleSettingsChange('colorTheme', {
                      ...settings.colorTheme,
                      submitButton: { ...settings.colorTheme.submitButton, textColor: e.target.value }
                    })}
                    className={styles.colorText}
                  />
                </div>
              </div>
            </div>
            
            {settings.colorTheme.wheelSlices.map((slice, index) => (
              <div key={index} className={styles.colorGroup}>
                <label>Wheel slice #{index + 1}</label>
                <div className={styles.colorInputs}>
                  <div className={styles.colorInput}>
                    <span>Background:</span>
                    <input
                      type="color"
                      value={slice.backgroundColor}
                      onChange={(e) => {
                        const newSlices = [...settings.colorTheme.wheelSlices];
                        newSlices[index] = { ...newSlices[index], backgroundColor: e.target.value };
                        handleSettingsChange('colorTheme', {
                          ...settings.colorTheme,
                          wheelSlices: newSlices
                        });
                      }}
                    />
                    <input
                      type="text"
                      value={slice.backgroundColor}
                      onChange={(e) => {
                        const newSlices = [...settings.colorTheme.wheelSlices];
                        newSlices[index] = { ...newSlices[index], backgroundColor: e.target.value };
                        handleSettingsChange('colorTheme', {
                          ...settings.colorTheme,
                          wheelSlices: newSlices
                        });
                      }}
                      className={styles.colorText}
                    />
                  </div>
                  <div className={styles.colorInput}>
                    <span>Text:</span>
                    <input
                      type="color"
                      value={slice.textColor}
                      onChange={(e) => {
                        const newSlices = [...settings.colorTheme.wheelSlices];
                        newSlices[index] = { ...newSlices[index], textColor: e.target.value };
                        handleSettingsChange('colorTheme', {
                          ...settings.colorTheme,
                          wheelSlices: newSlices
                        });
                      }}
                    />
                    <input
                      type="text"
                      value={slice.textColor}
                      onChange={(e) => {
                        const newSlices = [...settings.colorTheme.wheelSlices];
                        newSlices[index] = { ...newSlices[index], textColor: e.target.value };
                        handleSettingsChange('colorTheme', {
                          ...settings.colorTheme,
                          wheelSlices: newSlices
                        });
                      }}
                      className={styles.colorText}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'placement' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Placement</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.showOnDesktop}
                  onChange={(e) => handleSettingsChange('showOnDesktop', e.target.checked)}
                />
                <span>Show on desktop computers</span>
              </label>
              {settings.showOnDesktop && (
                <div className={styles.subSettings}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showOnExit}
                      onChange={(e) => handleSettingsChange('showOnExit', e.target.checked)}
                    />
                    <span>Just before exiting the page</span>
                  </label>
                  <div className={styles.delayInput}>
                    <input
                      type="number"
                      value={settings.triggerDelay}
                      onChange={(e) => handleSettingsChange('triggerDelay', parseInt(e.target.value) || 0)}
                      className={styles.input}
                    />
                    <span>sec after page loads</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.showOnMobile}
                  onChange={(e) => handleSettingsChange('showOnMobile', e.target.checked)}
                />
                <span>Show on tablets and mobiles</span>
              </label>
              {settings.showOnMobile && (
                <div className={styles.subSettings}>
                  <div className={styles.delayInput}>
                    <input
                      type="number"
                      value={settings.triggerDelay}
                      onChange={(e) => handleSettingsChange('triggerDelay', parseInt(e.target.value) || 0)}
                      className={styles.input}
                    />
                    <span>sec after page loads</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>Show it to the same user:</label>
              <select
                value={settings.showToSameUser}
                onChange={(e) => handleSettingsChange('showToSameUser', e.target.value)}
                className={styles.select}
              >
                <option value="once">Once per month</option>
                <option value="daily">Once per day</option>
                <option value="weekly">Once per week</option>
                <option value="monthly">Once per month</option>
                <option value="unlimited">Unlimited</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Show it to everyone again:</label>
              <button className={styles.resetButton}>
                <span>🔄</span> Reset cookies
              </button>
            </div>
            
            <div className={styles.formGroup}>
              <label>Add custom styles in CSS:</label>
              <div className={styles.advancedButton}>
                <span>ADVANCED</span>
              </div>
              <textarea
                placeholder="Enter custom CSS..."
                className={styles.textarea}
                rows={10}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Save Button */}
      <div className={styles.saveSection}>
        <button className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </div>
  );
}; 