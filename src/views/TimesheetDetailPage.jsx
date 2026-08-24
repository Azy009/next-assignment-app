'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { TimesheetModal } from '../components/TimesheetModal';
import { Loader } from '../components/Loader';
import { Footer } from '../components/Footer';

export default function TimesheetDetailPage({ timesheetId, onBack }) {
  const [timesheet, setTimesheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [projects, setProjects] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedDayDate, setSelectedDayDate] = useState('');

  const [activeMenuId, setActiveMenuId] = useState(null);

  const fetchTimesheetDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const [tsRes, projList, wtList] = await Promise.all([
        api.getTimesheetById(timesheetId),
        api.getProjects(),
        api.getWorkTypes()
      ]);
      setTimesheet(tsRes.data);
      setProjects(projList);
      setWorkTypes(wtList);
    } catch (err) {
      setError(err.message || 'Failed to load timesheet details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimesheetDetails();
  }, [timesheetId]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.menu-container')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleOpenAddModal = (dateStr) => {
    setEditingEntry(null);
    setSelectedDayDate(dateStr);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (entry, e) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setEditingEntry(entry);
    setSelectedDayDate(entry.date);
    setIsModalOpen(true);
  };

  const handleDeleteEntry = async (entryId, e) => {
    e.stopPropagation();
    setActiveMenuId(null);
    if (!window.confirm('Are you sure you want to delete this task entry?')) return;

    try {
      setLoading(true);
      const res = await api.deleteEntry(timesheetId, entryId);
      setTimesheet(res.data.timesheet);
    } catch (err) {
      alert(err.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (formData) => {
    if (editingEntry) {
      const res = await api.updateEntry(timesheetId, editingEntry.id, formData);
      setTimesheet(res.data.timesheet);
    } else {
      const res = await api.addEntry(timesheetId, formData);
      setTimesheet(res.data.timesheet);
    }
  };

  if (loading && !timesheet) {
    return (
      <div className="min-h-screen bg-gray-100/70 flex items-center justify-center p-6">
        <Loader />
      </div>
    );
  }

  if (error || !timesheet) {
    return (
      <div className="min-h-screen bg-gray-100/70 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center max-w-md">
          <p className="text-red-600 font-medium mb-4">{error || 'Timesheet not found'}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors cursor-pointer"
          >
            Back to Timesheets
          </button>
        </div>
      </div>
    );
  }

  const totalHours = timesheet.totalHours || 0;
  const targetHours = timesheet.targetHours || 40;
  const progressPercent = Math.min(100, Math.round((totalHours / targetHours) * 100));

  const entriesByDay = {};
  (timesheet.days || []).forEach(d => {
    entriesByDay[d.date] = (timesheet.entries || []).filter(e => e.date === d.date);
  });

  return (
    <div className="min-h-screen bg-gray-100/70 pb-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                This week's timesheet
              </h1>
              <p className="text-xs text-gray-400 mt-3 font-medium">
                {timesheet.dateRange}
              </p>
            </div>

            <div className="w-full md:w-80 space-y-2">
              <div className="relative flex items-center justify-between min-h-[44px]">
                <div 
                  className="absolute top-0 transition-all duration-300 transform -translate-x-1/2"
                  style={{ left: `${Math.max(22, Math.min(62, progressPercent))}%` }}
                >
                  <div className="bg-white border border-gray-100 shadow-md rounded-xl px-4 py-1.5 text-base sm:text-lg font-normal text-slate-800 whitespace-nowrap relative">
                    {totalHours}/{targetHours} hrs
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white"></div>
                  </div>
                </div>
                
                <span className="text-xs font-semibold text-gray-400 ml-auto pt-2">
                  {progressPercent}%
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200/80 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    progressPercent >= 100 ? 'bg-emerald-500' : 'bg-[#FF7A45]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {(timesheet.days || []).map((day) => {
              const dayEntries = entriesByDay[day.date] || [];

              return (
                <div key={day.date} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-2 pt-3">
                    <span className="text-sm font-bold text-gray-900">
                      {day.dayLabel}
                    </span>
                  </div>

                  <div className="md:col-span-10 space-y-3">
                    {dayEntries.map((entry) => (
                      <div 
                        key={entry.id}
                        className="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-4 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all group relative"
                      >
                        <div className="font-medium text-sm text-gray-800 pr-4">
                          {entry.description}
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-400 font-medium">
                            {entry.hours} hrs
                          </span>

                          <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-100">
                            {entry.project}
                          </span>

                          <div className="relative menu-container">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(prev => prev === entry.id ? null : entry.id);
                              }}
                              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </button>

                            {activeMenuId === entry.id && (
                              <div 
                                className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={(e) => handleOpenEditModal(entry, e)}
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer"
                                >
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteEntry(entry.id, e)}
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2 cursor-pointer"
                                >
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleOpenAddModal(day.date)}
                      className="w-full border border-dashed border-gray-300 hover:border-blue-400 bg-white hover:bg-[#EBF5FF] rounded-xl py-3 px-4 flex items-center justify-center text-xs font-medium text-gray-500 hover:text-blue-600 transition-all focus:outline-none cursor-pointer"
                    >
                      <span className="mr-1.5">+</span> Add new task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </main>

      <TimesheetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingEntry}
        availableProjects={projects}
        availableWorkTypes={workTypes}
        defaultDate={selectedDayDate}
      />
    </div>
  );
}
export { TimesheetDetailPage };
