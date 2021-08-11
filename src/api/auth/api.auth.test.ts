import {login} from '.';
import request from '../request';

jest.mock('../request');

const requestMock = request as jest.MockedFunction<typeof request>;

beforeEach(() => {
    requestMock.mockReset();
});


test("fetch login", async() => {

    requestMock.mockResolvedValueOnce({
        token: "QpwL5tke4Pnpja7X4",
    })

    const loginData = await login('test@gmail.com', 'password')

    expect(request).toHaveBeenCalled();
    expect(loginData).toEqual({
        token: "QpwL5tke4Pnpja7X4",
        id: 24,
        email: "test@gmail.com",
        firstName: "Julian",
        lastName: "Casablancas",
    });

});
