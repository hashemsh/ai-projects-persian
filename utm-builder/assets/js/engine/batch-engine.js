/**
 * UTM Builder Pro | Multi-Channel Batch Generator Engine
 */
window.UtmBatchEngine = {
  generate(baseUrl, campaignName, selectedChannels = [], extraOptions = {}) {
    if (!baseUrl || !campaignName) return [];

    const channels = selectedChannels.length > 0 
      ? selectedChannels 
      : (window.UtmPresets?.batchChannels || []);

    return channels.map(ch => {
      const built = window.UtmEngine.build({
        url: baseUrl,
        source: ch.source,
        medium: ch.medium,
        campaign: campaignName,
        term: extraOptions.term || '',
        content: ch.id || ''
      }, extraOptions);

      return {
        id: ch.id,
        name: ch.name,
        source: ch.source,
        medium: ch.medium,
        campaign: campaignName,
        url: built.url,
        success: built.success
      };
    });
  },

  toCsv(batchResults) {
    if (!batchResults || !batchResults.length) return '';
    const headers = ['کانال', 'Source', 'Medium', 'Campaign', 'لینک نهایی UTM'];
    const rows = batchResults.map(r => [
      `"${r.name}"`,
      `"${r.source}"`,
      `"${r.medium}"`,
      `"${r.campaign}"`,
      `"${r.url}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    return csvContent;
  },

  downloadCsv(csvContent, filename = 'campaign-utm-links.csv') {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
};
