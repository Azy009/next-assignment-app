'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { Footer } from '../components/Footer';

export default function TimesheetsTablePage({ onSelectTimesheet }) {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [dateRangeFilter, setDateRangeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({ totalCount: 0, totalPages: 1 });

  const [sortField, setSortField] = useState('weekNumber');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchTimesheets = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.getTimesheets({
        dateRangeFilter,
        statusFilter,
        page,
        limit
      });
      setTimesheets(res.data.timesheets);
      setPaginationInfo(res.data.pagination);
    } catch (err) {
      console.log(err.message || 'Failed to fetch timesheets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, [dateRangeFilter, statusFilter, page, limit]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedTimesheets = [...timesheets].sort((a, b) => {
    let multiplier = sortOrder === 'asc' ? 1 : -1;

    if (sortField === 'weekNumber') {
      return (Number(a.weekNumber) - Number(b.weekNumber)) * multiplier;
    } 
    
    if (sortField === 'dateRange') {
      const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
      const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
      return (dateA - dateB) * multiplier;
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100/70 pb-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Your Timesheets
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                value={dateRangeFilter}
                onChange={(e) => {
                  setDateRangeFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs"
              >
                <option value="ALL">Date Range</option>
                <option value="January">January 2024</option>
                <option value="February">February 2024</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs"
              >
                <option value="ALL">Status</option>
                <option value="COMPLETED">Completed</option>
                <option value="INCOMPLETE">Incomplete</option>
                <option value="MISSING">Missing</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {(dateRangeFilter !== 'ALL' || statusFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setDateRangeFilter('ALL');
                  setStatusFilter('ALL');
                  setPage(1);
                }}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 underline focus:outline-none cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th 
                    onClick={() => handleSort('weekNumber')}
                    className="py-4 px-6 cursor-pointer bg-gray-100/80 hover:bg-gray-200/80 transition-colors select-none border-r border-gray-200/50"
                  >
                    <div className="flex items-center space-x-1">
                      <span>WEEK #</span>
                      <svg 
                        className={`w-3 h-3 text-gray-600 transition-transform ${
                          sortField === 'weekNumber' && sortOrder === 'asc' ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('dateRange')}
                    className="py-4 px-6 cursor-pointer hover:bg-gray-100/80 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>DATE</span>
                      <svg 
                        className={`w-3 h-3 text-gray-600 transition-transform ${
                          sortField === 'dateRange' && sortOrder === 'asc' ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </th>
                  <th className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span>STATUS</span>
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-right">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500">
                      <Loader />
                    </td>
                  </tr>
                ) : sortedTimesheets.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500">
                      No timesheets found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  sortedTimesheets.map((ts) => {
                    let actionText = 'View';
                    if (ts.status === 'INCOMPLETE') actionText = 'Update';
                    if (ts.status === 'MISSING') actionText = 'Create';

                    return (
                      <tr key={ts.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4.5 px-6 font-semibold text-gray-900 bg-gray-50/70 border-r border-gray-200/50">
                          {ts.weekNumber}
                        </td>
                        <td className="py-4.5 px-6 text-gray-600">
                          {ts.dateRange}
                        </td>
                        <td className="py-4.5 px-6">
                          <StatusBadge status={ts.status} />
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <button
                            onClick={() => onSelectTimesheet(ts.id)}
                            className="font-medium text-blue-600 hover:text-blue-800 transition-colors focus:outline-none cursor-pointer"
                          >
                            {actionText}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            totalPages={paginationInfo.totalPages}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </div>

        <Footer />
      </main>
    </div>
  );
}
export { TimesheetsTablePage };
