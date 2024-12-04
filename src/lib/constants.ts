export const CONDITIONS = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'bad', label: 'Bad' },
    { value: 'damaged', label: 'Damaged' }
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