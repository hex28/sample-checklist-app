import request from '../request';


//used for mock data to add to reqres which returns only a token.
let mockUserData = {
    id: 24,
    firstName: 'Julian',
    lastName: 'Casablancas'
}

/*
*
* As this is a sample, email and password is hardcoded to work with https://reqres.in/
* Credit is given to them for their host ready api.
* email is still passed back as a response.
*/
export const login = (email: string, password:string): Promise<any> => {
    return request('https://reqres.in/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            })
        }
    )
    .then((res:Record<string, any>) => {
        return {
            ...res,
            email: email,
            ...mockUserData
        }
    })
}