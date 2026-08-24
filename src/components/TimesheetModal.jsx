'use client';

import React, { useState, useEffect } from 'react';

export const TimesheetModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null, 
  availableProjects = [], 
  availableWorkTypes = [],
  defaultDate = ''
}) => {
  const [project, setProject] = useState('');
  const [workType, setWorkType] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(12);
  const [date, setDate] = useState(defaultDate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setProject(initialData.project || availableProjects[0] || 'Project Name');
      setWorkType(initialData.workType || availableWorkTypes[0] || 'Bug fixes');
      setDescription(initialData.description || '');
      setHours(initialData.hours || 12);
      setDate(initialData.date || defaultDate || '');
    } else {
      setProject(availableProjects[0] || 'Project Name');
      setWorkType(availableWorkTypes[0] || 'Bug fixes');
      setDescription('');
      setHours(12);
      setDate(defaultDate || '');
    }
    setError('');
  }, [initialData, availableProjects, availableWorkTypes, defaultDate, isOpen]);

  if (!isOpen) return null;

  const handleDecrement = () => {
    setHours(prev => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setHours(prev => Math.min(24, prev + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project) {
      setError('Please select a project');
      return;
    }
    if (!workType) {
      setError('Please select type of work');
      return;
    }
    if (!description.trim()) {
      setError('Task description is required');
      return;
    }
    if (hours <= 0) {
      setError('Hours must be at least 1');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit({
        date,
        project,
        workType,
        description,
        hours: Number(hours) || 1
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            {initialData ? 'Edit Entry' : 'Add New Entry'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3.5 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Select Project - Normal width */}
          <div className="max-w-md">
            <div className="flex items-center mb-2">
              <label className="text-sm font-semibold text-gray-900">
                Select Project <span className="text-gray-900 font-bold">*</span>
              </label>
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-300/80 text-white text-[10px] font-bold cursor-pointer" title="Select client project">
                i
              </span>
            </div>
            <div className="relative">
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer shadow-2xs pr-10"
              >
                {availableProjects.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Type of Work - Normal width */}
          <div className="max-w-md">
            <div className="flex items-center mb-2">
              <label className="text-sm font-semibold text-gray-900">
                Type of Work <span className="text-gray-900 font-bold">*</span>
              </label>
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-300/80 text-white text-[10px] font-bold cursor-pointer" title="Category of work">
                i
              </span>
            </div>
            <div className="relative">
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer shadow-2xs pr-10"
              >
                {availableWorkTypes.map(wt => (
                  <option key={wt} value={wt}>{wt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Task description - WIDER width! */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Task description <span className="text-gray-900 font-bold">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write text here ..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-2xs outline-none"
            />
            <p className="mt-2 text-xs text-gray-400 font-normal">A note for extra info</p>
          </div>

          {/* Hours */}
          <div className="max-w-md">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Hours <span className="text-gray-900 font-bold">*</span>
            </label>
            <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50/80 shadow-2xs">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-9 h-9 bg-gray-100/70 hover:bg-gray-200/80 text-gray-700 font-bold text-base flex items-center justify-center border-r border-gray-200 transition-colors cursor-pointer select-none"
              >
                -
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={hours}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
                  if (!isNaN(val)) setHours(Math.max(1, Math.min(24, val)));
                  else if (e.target.value === '') setHours('');
                }}
                onBlur={() => {
                  if (!hours || hours < 1) setHours(1);
                }}
                className="w-12 h-9 text-center font-semibold text-gray-800 text-sm focus:outline-none border-none bg-white select-none"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="w-9 h-9 bg-gray-100/70 hover:bg-gray-200/80 text-gray-700 font-bold text-base flex items-center justify-center border-l border-gray-200 transition-colors cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Full-bleed edge-to-edge grey divider line & action buttons matching Figma */}
          <div className="-mx-8 border-t border-gray-100 px-8 pt-6 mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#1865F2] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer text-center"
            >
              {isSubmitting ? 'Saving...' : (initialData ? 'Update entry' : 'Add entry')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm py-3.5 px-4 rounded-xl shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
