const request = (
        url: string,
        options: {
            method: string,
            headers: Record<string,any>,
            body: string,
        } | undefined = undefined
    ): Promise<Record<string,any>> => {
    return fetch(url, options ? {
           method: options.method || 'GET',
           headers: options.headers || {},
           body: options.body
       } : undefined)
       .then(res => res.json())
}

export default request