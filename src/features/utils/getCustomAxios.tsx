export const getCustomAxios = (baseUrl: string, defaultRequest: RequestInit) => {
    const { headers, ...rest } = defaultRequest


    const fetch = (url: string, config: RequestInit) => {
        const promise = window.fetch(baseUrl + url, {
            ...rest,
            ...config,
            headers: {
                ...headers,
                ...config.headers,
            },
            
        })
        console.log(headers)

        return {
            json: async () => {
                const response = await promise
                console.log(response)
                if (!response.ok) {
                    return Promise.reject(await response.json())
                }
                return await response.json()
            },
            text: async () => {
                const response = await promise
                if (!response.ok) {
                    return Promise.reject(await response.text())
                }
                return await response.text()
            }
        }
    }

    return {
        get: (url: string, config?: RequestInit) => {
            return fetch(url, {...config, method: 'GET'})
        },
        post: (url: string, config?: RequestInit) => {
            // console.log(config?.headers)
            return fetch(url, {
                // ...config,
                method:'Post',
                body: JSON.stringify(config?.body),
                headers: {
                    ...config?.headers,
                },
            })
        },
        put: (url: string, config?: RequestInit) => {
            return fetch(url, {
                ...config,
                method:'PUT',
                body: JSON.stringify(config?.body),
                headers: {
                    ...config?.headers,
                },
            })
        },
    }
}

export const monAxios = getCustomAxios("http://localhost:3001/api/v1/", {
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
    },
})
