"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import AnalyticsOverview from './_components/AnalyticsOverview';
import LoadingSpinner from './_components/LoadingSpinner';

const Analytics = () => {
  const { user } = useUser();
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserForms();
    }
  }, [user]);

  const fetchUserForms = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/forms');
      console.log('Forms fetched:', response.data.forms);  // Debugging log
      setForms(response.data.forms);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forms:', error);
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async (formId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/analytics/${formId}`);
      setAnalyticsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setLoading(false);
    }
  };

  const handleFormSelect = (event) => {
    const formId = event.target.value;
    setSelectedFormId(formId);
    fetchAnalyticsData(formId);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Form Analytics</h1>

      {loading && <LoadingSpinner />}

      {!loading && (
        <>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Select Form:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedFormId || ''}
              onChange={handleFormSelect}
            >
              <option value="" disabled>
                -- Select a form --
              </option>
              {forms.map((form) => {
                // Parse the JSON form data
                const parsedForm = JSON.parse(form.jsonform);
                return (
                  <option key={form.id} value={form.id}>
                    {parsedForm.title}
                  </option>
                );
              })}
            </select>
          </div>

          {analyticsData && (
            <AnalyticsOverview analyticsData={analyticsData} />
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
