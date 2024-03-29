export const Constants = {
    EMPTY_STRING: '',

    FIRST_PAGE_INDEX: 1,
    MAX_TASKS_PER_PAGE: 5,
    MAX_PAGINATION_PAGES: 5,

    FILTER_ALL: '',
    FILTER_UNDONE: 'undone',
    FILTER_DONE: 'done',

    DATE_FILTER_DIRECTION_UP: 'asc',
    DATE_FILTER_DIRECTION_DOWN: 'desc',

    ERROR_EMPTY_TASK: 'Поле задачи не может быть пустым',
    ERROR_DUPLICATE_TASK: 'Такая задача уже существует',

    ERROR_NON_EXIST_TASK: 'Такой задачи не существует',


    HTTP_OK: 200,
    HTTP_BAD_REQUEST: 400,
    HTTP_UNPROCESSABLE_ENTITY: 422,
    HTTP_NOT_FOUND: 404,
    HTTP_NO_CONTENT: 204
};