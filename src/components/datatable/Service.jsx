export function getData() {
    return fetch('http://localhost:3636/users')
        .then(data => data.json())
}