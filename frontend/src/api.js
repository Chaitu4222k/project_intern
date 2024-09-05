import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Base URL from environment variables
});

// Intern API functions
export const createIntern = async (internData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post('/intern', internData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating intern:', error);
        throw error;
    }
};

export const fetchInterns = async () => {
    try {
        const response = await api.get('/intern');
        return response.data;
    } catch (error) {
        console.error('Error fetching interns:', error);
        throw error;
    }
};

export const updateIntern = async (id, internData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.put(`/intern/${id}`, internData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating intern:', error);
        throw error;
    }
};

export const deleteIntern = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.delete(`/intern/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting intern:', error);
        throw error;
    }
};

// Performance API functions
export const createPerformance = async (performanceData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post('/performance', performanceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating performance record:', error);
        throw error;
    }
};

export const fetchPerformances = async () => {
    try {
        const response = await api.get('/performance');
        return response.data;
    } catch (error) {
        console.error('Error fetching performance records:', error);
        throw error;
    }
};

export const updatePerformance = async (id, performanceData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.put(`/performance/${id}`, performanceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating performance record:', error);
        throw error;
    }
};

export const deletePerformance = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.delete(`/performance/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting performance record:', error);
        throw error;
    }
};

// Task API functions
export const createTask = async (taskData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post('/task', taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const fetchTasks = async () => {
    try {
        const response = await api.get('/task');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const updateTask = async (id, taskData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.put(`/task/${id}`, taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.delete(`/task/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Feedback API functions
export const createFeedback = async (feedbackData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post('/feedback', feedbackData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
    }
};

export const fetchFeedbacks = async () => {
    try {
        const response = await api.get('/feedback');
        return response.data;
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        throw error;
    }
};

export const updateFeedback = async (id, feedbackData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.put(`/feedback/${id}`, feedbackData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw error;
    }
};

export const deleteFeedback = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.delete(`/feedback/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error;
    }
};
