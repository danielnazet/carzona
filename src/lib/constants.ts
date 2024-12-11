export const CONDITIONS = [
    { value: 'nowy', label: 'Nowy' },
    { value: 'doskonaly', label: 'Doskonały' },
    { value: 'dobry', label: 'Dobry' },
    { value: 'sredni', label: 'Przecietny' },
    { value: 'slaby', label: 'Slaby' },
    { value: 'uszkodzony', label: 'Uszkodzony' }
  ] as const;
  
  export const MAX_PHOTOS = 10;
  
  // Convert kilometers to formatted string with unit
  export const formatDistance = (kilometers: number | undefined | null): string => {
    if (typeof kilometers !== 'number') return '0 km';
    return `${kilometers.toLocaleString()} km`;
  };
  
  // Convert PLN to formatted string with currency
  export const formatPrice = (amount: number | undefined | null): string => {
    if (typeof amount !== 'number') return '0 PLN';
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(amount);
  };

  export const LISTING_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;