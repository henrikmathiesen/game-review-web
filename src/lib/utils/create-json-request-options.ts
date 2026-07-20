type JsonMethod = 'POST' | 'PUT' | 'PATCH';

export function createJsonRequestOptions(method: JsonMethod, body: unknown): RequestInit {
  return {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}
