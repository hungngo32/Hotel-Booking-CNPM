export function getList(id) {
    return fetch('http://localhost:3636/api/rooms/' + id)
        .then(data => data.json())
}