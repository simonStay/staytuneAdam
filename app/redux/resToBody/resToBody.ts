export default async function resToBody(res) {
    let body = null;
    if (res.headers['Content-Type'] === 'application/json') {
        body = await res.json();
    } else {
        body = await res.text();
        try {
            body = JSON.parse(body);
        } catch (err) {
            body = 'error';
        }
    }
    return body;
}
