import React from "react";
export const AppContext = React.createContext();
export const AppSettings = {
    FIRST_PAGE_INDEX: 0,
    MAX_TASKS_PER_PAGE: 10,
    MAX_PAGINATION_PAGES: 5,

    FILTER_ALL: 'FILTER_ALL',
    FILTER_UNDONE: 'FILTER_UNDONE',
    FILTER_DONE: 'FILTER_DONE'
};