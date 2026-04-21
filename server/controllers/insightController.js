import Insight from '../models/Insight.js';

// Get all insights with optional filters
export const getInsights = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
      limit = 1000
    } = req.query;

    // Build filter object
    const filter = {};

    if (end_year) filter.end_year = end_year;
    if (topic) filter.topic = new RegExp(topic, 'i');
    if (sector) filter.sector = new RegExp(sector, 'i');
    if (region) filter.region = new RegExp(region, 'i');
    if (pestle) filter.pestle = new RegExp(pestle, 'i');
    if (source) filter.source = new RegExp(source, 'i');
    if (swot) filter.swot = new RegExp(swot, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (city) filter.city = new RegExp(city, 'i');

    const insights = await Insight.find(filter).limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: insights.length,
      data: insights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get filter options (unique values for each filter)
export const getFilterOptions = async (req, res) => {
  try {
    const [
      endYears,
      topics,
      sectors,
      regions,
      pestles,
      sources,
      swots,
      countries,
      cities
    ] = await Promise.all([
      Insight.distinct('end_year'),
      Insight.distinct('topic'),
      Insight.distinct('sector'),
      Insight.distinct('region'),
      Insight.distinct('pestle'),
      Insight.distinct('source'),
      Insight.distinct('swot'),
      Insight.distinct('country'),
      Insight.distinct('city')
    ]);

    res.status(200).json({
      success: true,
      data: {
        endYears: endYears.filter(val => val !== '').sort(),
        topics: topics.filter(val => val !== '').sort(),
        sectors: sectors.filter(val => val !== '').sort(),
        regions: regions.filter(val => val !== '').sort(),
        pestles: pestles.filter(val => val !== '').sort(),
        sources: sources.filter(val => val !== '').sort(),
        swots: swots.filter(val => val !== '').sort(),
        countries: countries.filter(val => val !== '').sort(),
        cities: cities.filter(val => val !== '').sort()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get aggregated statistics
export const getStatistics = async (req, res) => {
  try {
    const stats = await Insight.aggregate([
      {
        $group: {
          _id: null,
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          avgRelevance: { $avg: '$relevance' },
          totalRecords: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
