import { supabase } from './supabase';
import { LISTING_EXPIRATION_TIME } from './constants';

export const cleanupExpiredListings = async () => {
  try {
    const expirationDate = new Date(Date.now() - LISTING_EXPIRATION_TIME);

    const { data: expiredListings, error: fetchError } = await supabase
      .from('car_listings')
      .select('id')
      .eq('status', 'active')
      .lt('created_at', expirationDate.toISOString());

    if (fetchError) throw fetchError;

    if (expiredListings && expiredListings.length > 0) {
      const { error: updateError } = await supabase
        .from('car_listings')
        .update({ status: 'expired' })
        .in('id', expiredListings.map(listing => listing.id));

      if (updateError) throw updateError;

      console.log(`Marked ${expiredListings.length} listings as expired`);
    }
  } catch (error) {
    console.error('Error cleaning up expired listings:', error);
  }
};

export const republishListing = async (listingId: string) => {
  try {
    const { error } = await supabase
      .from('car_listings')
      .update({ 
        status: 'active',
        created_at: new Date().toISOString()
      })
      .eq('id', listingId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error republishing listing:', error);
    return { success: false, error };
  }
};

export const startCleanupInterval = () => {
  // Run cleanup immediately
  cleanupExpiredListings();

  // Then run every 5 minutes
  const intervalId = setInterval(cleanupExpiredListings, 5 * 60 * 1000);

  return () => clearInterval(intervalId);
};