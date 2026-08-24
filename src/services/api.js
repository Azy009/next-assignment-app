import { INITIAL_USER, INITIAL_PROJECTS, INITIAL_WORK_TYPES, INITIAL_TIMESHEETS } from './mockData';

const STORAGE_KEYS = {
  TIMESHEETS: 'ticktock_timesheets',
  USER: 'ticktock_current_user',
  PROJECTS: 'ticktock_projects',
  WORK_TYPES: 'ticktock_work_types'
};

const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

export const calculateStatus = (entries = [], targetHours = 40) => {
  const totalHours = entries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0);
  if (totalHours >= targetHours) return 'COMPLETED';
  if (totalHours > 0) return 'INCOMPLETE';
  return 'MISSING';
};

export const calculateTotalHours = (entries = []) => {
  return entries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0);
};

const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.TIMESHEETS)) {
    localStorage.setItem(STORAGE_KEYS.TIMESHEETS, JSON.stringify(INITIAL_TIMESHEETS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.WORK_TYPES)) {
    localStorage.setItem(STORAGE_KEYS.WORK_TYPES, JSON.stringify(INITIAL_WORK_TYPES));
  }
};

if (typeof window !== 'undefined') {
  initializeStorage();
}

const getStoredTimesheets = () => {
  if (typeof window === 'undefined') return INITIAL_TIMESHEETS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TIMESHEETS);
    if (!raw) return INITIAL_TIMESHEETS;
    const parsed = JSON.parse(raw);
    if (parsed.length < INITIAL_TIMESHEETS.length) {
      localStorage.setItem(STORAGE_KEYS.TIMESHEETS, JSON.stringify(INITIAL_TIMESHEETS));
      return INITIAL_TIMESHEETS;
    }
    return parsed;
  } catch (err) {
    console.error("Error reading timesheets from storage:", err);
    return INITIAL_TIMESHEETS;
  }
};

const saveStoredTimesheets = (timesheets) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TIMESHEETS, JSON.stringify(timesheets));
  }
};

export const api = {
  async login(email, password) {
    await delay(300);
    if (!email || !email.includes('@')) {
      throw new Error("Invalid email address format.");
    }
    if (!password) {
      throw new Error("Please enter your password.");
    }
    
    if (email !== INITIAL_USER.email) {
      throw new Error("Invalid email address. User does not exist.");
    }

    if (password !== INITIAL_USER.password) {
      throw new Error("Incorrect password. Please try again.");
    }

    const user = {
      id: INITIAL_USER.id,
      name: INITIAL_USER.name,
      email: INITIAL_USER.email
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
    return { status: 200, data: { user } };
  },

  async logout() {
    await delay(150);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    return { status: 200, message: "Logged out successfully" };
  },

  async getCurrentUser() {
    await delay(100);
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw);
  },

  async getTimesheets({ dateRangeFilter = '', statusFilter = '', page = 1, limit = 5 } = {}) {
    await delay(300);
    let list = getStoredTimesheets();

    list = list.map(ts => {
      const totalHours = calculateTotalHours(ts.entries || []);
      const status = calculateStatus(ts.entries || [], ts.targetHours || 40);
      return {
        ...ts,
        totalHours,
        status
      };
    });

    if (statusFilter && statusFilter !== 'ALL') {
      list = list.filter(ts => ts.status.toUpperCase() === statusFilter.toUpperCase());
    }

    if (dateRangeFilter && dateRangeFilter !== 'ALL') {
      const filterQuery = dateRangeFilter.toLowerCase().trim();
      list = list.filter(ts => ts.dateRange.toLowerCase().includes(filterQuery));
    }

    const totalCount = list.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedItems = list.slice(startIndex, startIndex + limit);

    return {
      status: 200,
      data: {
        timesheets: paginatedItems,
        pagination: {
          totalCount,
          totalPages,
          currentPage,
          limit
        }
      }
    };
  },

  async getTimesheetById(id) {
    await delay(250);
    const list = getStoredTimesheets();
    const timesheet = list.find(ts => String(ts.id) === String(id));

    if (!timesheet) {
      throw new Error(`Timesheet with ID ${id} not found.`);
    }

    const totalHours = calculateTotalHours(timesheet.entries || []);
    const status = calculateStatus(timesheet.entries || [], timesheet.targetHours || 40);

    return {
      status: 200,
      data: {
        ...timesheet,
        totalHours,
        status
      }
    };
  },

  async addEntry(timesheetId, { date, project, workType, description, hours }) {
    await delay(300);
    const list = getStoredTimesheets();
    const index = list.findIndex(ts => String(ts.id) === String(timesheetId));

    if (index === -1) {
      throw new Error(`Timesheet with ID ${timesheetId} not found.`);
    }

    const newEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      date,
      project: project || "Project Name",
      workType: workType || "Feature Development",
      description: description || "New Task Entry",
      hours: Number(hours) || 1
    };

    list[index].entries = list[index].entries || [];
    list[index].entries.push(newEntry);

    saveStoredTimesheets(list);

    const updatedTotalHours = calculateTotalHours(list[index].entries);
    const updatedStatus = calculateStatus(list[index].entries, list[index].targetHours);

    return {
      status: 201,
      data: {
        entry: newEntry,
        timesheet: {
          ...list[index],
          totalHours: updatedTotalHours,
          status: updatedStatus
        }
      }
    };
  },

  async updateEntry(timesheetId, entryId, { date, project, workType, description, hours }) {
    await delay(300);
    const list = getStoredTimesheets();
    const tsIndex = list.findIndex(ts => String(ts.id) === String(timesheetId));

    if (tsIndex === -1) {
      throw new Error(`Timesheet with ID ${timesheetId} not found.`);
    }

    const entryIndex = list[tsIndex].entries.findIndex(e => String(e.id) === String(entryId));
    if (entryIndex === -1) {
      throw new Error(`Entry with ID ${entryId} not found.`);
    }

    list[tsIndex].entries[entryIndex] = {
      ...list[tsIndex].entries[entryIndex],
      date: date || list[tsIndex].entries[entryIndex].date,
      project: project || list[tsIndex].entries[entryIndex].project,
      workType: workType || list[tsIndex].entries[entryIndex].workType,
      description: description || list[tsIndex].entries[entryIndex].description,
      hours: Number(hours) !== undefined ? Number(hours) : list[tsIndex].entries[entryIndex].hours
    };

    saveStoredTimesheets(list);

    const updatedTotalHours = calculateTotalHours(list[tsIndex].entries);
    const updatedStatus = calculateStatus(list[tsIndex].entries, list[tsIndex].targetHours);

    return {
      status: 200,
      data: {
        entry: list[tsIndex].entries[entryIndex],
        timesheet: {
          ...list[tsIndex],
          totalHours: updatedTotalHours,
          status: updatedStatus
        }
      }
    };
  },

  async deleteEntry(timesheetId, entryId) {
    await delay(250);
    const list = getStoredTimesheets();
    const tsIndex = list.findIndex(ts => String(ts.id) === String(timesheetId));

    if (tsIndex === -1) {
      throw new Error(`Timesheet with ID ${timesheetId} not found.`);
    }

    list[tsIndex].entries = list[tsIndex].entries.filter(e => String(e.id) !== String(entryId));
    saveStoredTimesheets(list);

    const updatedTotalHours = calculateTotalHours(list[tsIndex].entries);
    const updatedStatus = calculateStatus(list[tsIndex].entries, list[tsIndex].targetHours);

    return {
      status: 200,
      data: {
        timesheet: {
          ...list[tsIndex],
          totalHours: updatedTotalHours,
          status: updatedStatus
        }
      }
    };
  },

  async getProjects() {
    await delay(100);
    if (typeof window === 'undefined') return INITIAL_PROJECTS;
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return raw ? JSON.parse(raw) : INITIAL_PROJECTS;
  },

  async getWorkTypes() {
    await delay(100);
    if (typeof window === 'undefined') return INITIAL_WORK_TYPES;
    const raw = localStorage.getItem(STORAGE_KEYS.WORK_TYPES);
    return raw ? JSON.parse(raw) : INITIAL_WORK_TYPES;
  }
};
