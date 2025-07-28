import { useState } from 'react';
import type { BlockInstance } from '../../../types';

interface DropdownCityProps {
  block: BlockInstance;
}

interface CityOption {
  value: string;
  label: string;
}

export const DropdownCityBlock = ({ block }: DropdownCityProps) => {
  const { content, style } = block;
  const [isInvalid, setIsInvalid] = useState(false);
  
  // Custom CSS özelliklerini işleme
  const parseCustomCSS = () => {
    if (!content.customCSS) return {};
    
    const customStyles: Record<string, string> = {};
    const cssRules = content.customCSS
      .split(';')
      .filter((rule: string) => rule.trim() !== '')
      .map((rule: string) => rule.trim());
    
    cssRules.forEach((rule: string) => {
      const [property, value] = rule.split(':').map((part) => part.trim());
      if (property && value) {
        // CSS özelliklerini camelCase formatına dönüştür (React inline style için)
        const formattedProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        customStyles[formattedProperty] = value;
      }
    });
    
    return customStyles;
  };
  
  const handleInvalid = (e: React.InvalidEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setIsInvalid(true);
  };
  
  const handleInput = () => {
    setIsInvalid(false);
  };
  
  // Şehir seçenekleri (Türkiye'nin 81 ili)
  const cityOptions: CityOption[] = content.options || [
    { value: '', label: 'Şehir Seçiniz' },
    { value: 'adana', label: 'Adana' },
    { value: 'adiyaman', label: 'Adıyaman' },
    { value: 'afyonkarahisar', label: 'Afyonkarahisar' },
    { value: 'agri', label: 'Ağrı' },
    { value: 'amasya', label: 'Amasya' },
    { value: 'ankara', label: 'Ankara' },
    { value: 'antalya', label: 'Antalya' },
    { value: 'artvin', label: 'Artvin' },
    { value: 'aydin', label: 'Aydın' },
    { value: 'balikesir', label: 'Balıkesir' },
    { value: 'bilecik', label: 'Bilecik' },
    { value: 'bingol', label: 'Bingöl' },
    { value: 'bitlis', label: 'Bitlis' },
    { value: 'bolu', label: 'Bolu' },
    { value: 'burdur', label: 'Burdur' },
    { value: 'bursa', label: 'Bursa' },
    { value: 'canakkale', label: 'Çanakkale' },
    { value: 'cankiri', label: 'Çankırı' },
    { value: 'corum', label: 'Çorum' },
    { value: 'denizli', label: 'Denizli' },
    { value: 'diyarbakir', label: 'Diyarbakır' },
    { value: 'edirne', label: 'Edirne' },
    { value: 'elazig', label: 'Elazığ' },
    { value: 'erzincan', label: 'Erzincan' },
    { value: 'erzurum', label: 'Erzurum' },
    { value: 'eskisehir', label: 'Eskişehir' },
    { value: 'gaziantep', label: 'Gaziantep' },
    { value: 'giresun', label: 'Giresun' },
    { value: 'gumushane', label: 'Gümüşhane' },
    { value: 'hakkari', label: 'Hakkari' },
    { value: 'hatay', label: 'Hatay' },
    { value: 'isparta', label: 'Isparta' },
    { value: 'mersin', label: 'Mersin' },
    { value: 'istanbul', label: 'İstanbul' },
    { value: 'izmir', label: 'İzmir' },
    { value: 'kars', label: 'Kars' },
    { value: 'kastamonu', label: 'Kastamonu' },
    { value: 'kayseri', label: 'Kayseri' },
    { value: 'kirklareli', label: 'Kırklareli' },
    { value: 'kirsehir', label: 'Kırşehir' },
    { value: 'kocaeli', label: 'Kocaeli' },
    { value: 'konya', label: 'Konya' },
    { value: 'kutahya', label: 'Kütahya' },
    { value: 'malatya', label: 'Malatya' },
    { value: 'manisa', label: 'Manisa' },
    { value: 'kahramanmaras', label: 'Kahramanmaraş' },
    { value: 'mardin', label: 'Mardin' },
    { value: 'mugla', label: 'Muğla' },
    { value: 'mus', label: 'Muş' },
    { value: 'nevsehir', label: 'Nevşehir' },
    { value: 'nigde', label: 'Niğde' },
    { value: 'ordu', label: 'Ordu' },
    { value: 'rize', label: 'Rize' },
    { value: 'sakarya', label: 'Sakarya' },
    { value: 'samsun', label: 'Samsun' },
    { value: 'siirt', label: 'Siirt' },
    { value: 'sinop', label: 'Sinop' },
    { value: 'sivas', label: 'Sivas' },
    { value: 'tekirdag', label: 'Tekirdağ' },
    { value: 'tokat', label: 'Tokat' },
    { value: 'trabzon', label: 'Trabzon' },
    { value: 'tunceli', label: 'Tunceli' },
    { value: 'sanliurfa', label: 'Şanlıurfa' },
    { value: 'usak', label: 'Uşak' },
    { value: 'van', label: 'Van' },
    { value: 'yozgat', label: 'Yozgat' },
    { value: 'zonguldak', label: 'Zonguldak' },
    { value: 'aksaray', label: 'Aksaray' },
    { value: 'bayburt', label: 'Bayburt' },
    { value: 'karaman', label: 'Karaman' },
    { value: 'kirikkale', label: 'Kırıkkale' },
    { value: 'batman', label: 'Batman' },
    { value: 'sirnak', label: 'Şırnak' },
    { value: 'bartin', label: 'Bartın' },
    { value: 'ardahan', label: 'Ardahan' },
    { value: 'igdir', label: 'Iğdır' },
    { value: 'yalova', label: 'Yalova' },
    { value: 'karabuk', label: 'Karabük' },
    { value: 'kilis', label: 'Kilis' },
    { value: 'osmaniye', label: 'Osmaniye' },
    { value: 'duzce', label: 'Düzce' }
  ];
  
  return (
    <div style={{ padding: '10px', width: '100%', height: '100%', ...style }}>
      <div style={{ marginBottom: '8px' }}>
        <label 
          htmlFor={`dropdown-city-${block.id}`}
          style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontSize: style.fontSize || '14px',
            fontWeight: 'bold',
            color: style.color || '#000000'
          }}
        >
          {content.label || 'Şehir'}
          {content.required && <span style={{ color: '#e53e3e', marginLeft: '3px' }}>*</span>}
        </label>
        
        <select
          id={`dropdown-city-${block.id}`}
          required={content.required}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: isInvalid ? '1px solid #e53e3e' : '1px solid #d1d5db',
            borderRadius: style.borderRadius || '4px',
            fontSize: style.fontSize || '14px',
            color: style.color || '#000000',
            backgroundColor: style.backgroundColor || '#ffffff',
            fontFamily: style.fontFamily || 'inherit',
            appearance: 'auto',
            ...parseCustomCSS()
          }}
          onInvalid={handleInvalid}
          onInput={handleInput}
        >
          {cityOptions.map((option: CityOption, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {isInvalid && content.showError && (
          <div style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px' }}>
            {content.errorMessage || 'Lütfen şehir seçiniz'}
          </div>
        )}
      </div>
    </div>
  );
}; 