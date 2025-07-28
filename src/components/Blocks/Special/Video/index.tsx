import type { BlockInstance } from '../../../../types';

interface VideoBlockProps {
  block: BlockInstance;
}

export const VideoBlock = ({ block }: VideoBlockProps) => {
  const { content, style } = block;
  
  // Video URL'sini güvenli bir şekilde işle
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube URL'lerini embed URL'lerine dönüştür
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // YouTube kısa URL'lerini embed URL'lerine dönüştür
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Vimeo URL'lerini embed URL'lerine dönüştür
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Diğer URL'ler için doğrudan URL'yi kullan
    return url;
  };
  
  // Video parametrelerini oluştur
  const getVideoParams = () => {
    const params = [];
    
    if (content.autoplay) params.push('autoplay=1');
    if (content.muted) params.push('mute=1');
    if (content.loop) params.push('loop=1');
    if (!content.controls) params.push('controls=0');
    
    return params.length > 0 ? `?${params.join('&')}` : '';
  };
  
  // Video URL'si yoksa mesaj göster
  if (!content.src) {
    return (
      <div 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          padding: '20px',
          textAlign: 'center',
          height: '100%',
        }}
      >
        Lütfen video URL'si ekleyin
      </div>
    );
  }
  
  // Embed URL ve parametreleri oluştur
  const embedUrl = getEmbedUrl(content.src);
  const videoParams = getVideoParams();
  const fullUrl = `${embedUrl}${videoParams}`;
  
  // Video tipini belirle
  const isIframe = embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com');
  
  return (
    <div 
      style={{
        ...style,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {isIframe ? (
        <iframe
          src={fullUrl}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            borderRadius: style.borderRadius || '0',
          }}
        />
      ) : (
        <video
          src={content.src}
          controls={content.controls !== false}
          autoPlay={content.autoplay || false}
          muted={content.muted || false}
          loop={content.loop || false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: style.borderRadius || '0',
          }}
        >
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      )}
    </div>
  );
}; 