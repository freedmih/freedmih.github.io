import API from "../api/api"

export function redirectIfNotLogin (history) {
    const token = localStorage.getItem('jwt');

    if (!token) {
        history.push('/auth');
    }

    API.post('/validate', {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => {
            if (res.status !== 200) {
                history.push('/auth');
            }
        })
        .catch(err => {
            console.log(err);
            history.push('/auth');
        })
}

export function redirectIfLogin(history) {
    const token = localStorage.getItem('jwt');

    if (!token) {
        return;
    }

    API.post('/validate', {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => {
            if (res.status == 200) {
                history.push('/');
            }
        })
}