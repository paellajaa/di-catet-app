/**
 * useCurrency composable
 * Format angka ke mata uang Rupiah (IDR)
 */
export function useCurrency() {
  /**
   * Format angka ke Rupiah
   * @param {number} amount
   * @returns {string} e.g. "Rp 1.500.000"
   */
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  /**
   * Format angka singkat (untuk card summary)
   * @param {number} amount
   * @returns {string} e.g. "1.5jt" atau "500rb"
   */
  const formatShort = (amount) => {
    if (amount >= 1_000_000_000) {
      return `${(amount / 1_000_000_000).toFixed(1).replace('.0', '')}M`;
    }
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(1).replace('.0', '')}jt`;
    }
    if (amount >= 1_000) {
      return `${(amount / 1_000).toFixed(1).replace('.0', '')}rb`;
    }
    return amount.toString();
  };

  return { formatRupiah, formatShort };
}
