import React from 'react';
import FormSubmissionChart from './FormSubmissionChart';
import ResponseRateChart from './ResponseRateChart';

const AnalyticsOverview = ({ analyticsData }) => {
  const {
    form,
    submissionCount,
    viewCount,
    conversionRate,
    submissionsOverTime,
  } = analyticsData;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{form.title} Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold">{viewCount}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-gray-500">Total Submissions</h3>
          <p className="text-2xl font-bold">{submissionCount}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-gray-500">Conversion Rate</h3>
          <p className="text-2xl font-bold">{conversionRate}%</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Submissions Over Time</h3>
        <FormSubmissionChart data={submissionsOverTime} />
      </div>
    </div>
  );
};

export default AnalyticsOverview;
