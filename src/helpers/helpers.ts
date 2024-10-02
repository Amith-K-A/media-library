// helpers.ts

export const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  export const getPerPage = () => {
    if (window.innerWidth >= 1280) return 30;
    if (window.innerWidth >= 768) return 10;
    return 10;
  };
  
  export const getNetworkSpeed = () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType; // 4g, 3g, 2g
    }
    return null;
  };
  