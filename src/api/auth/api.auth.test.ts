import {login, getUser} from '.';
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
    });

});

test("fetch user", async() => {

    requestMock.mockResolvedValueOnce({
        "results":[{"gender":"female","name":{"title":"Ms","first":"Elif","last":"Bakırcıoğlu"},"location":{"street":{"number":2100,"name":"Doktorlar Cd"},"city":"Çankırı","state":"Van","country":"Turkey","postcode":82829,"coordinates":{"latitude":"74.8959","longitude":"0.7159"},"timezone":{"offset":"-6:00","description":"Central Time (US & Canada), Mexico City"}},"email":"elif.bakircioglu@example.com","login":{"uuid":"52c3323c-c876-4369-b9e4-3efc5ad0313d","username":"crazyduck889","password":"tetsuo","salt":"FEApxKDL","md5":"e307b24c5e029c18accf119eb7c4c68a","sha1":"708d48e4d474393acdc0dd820e4daa28b2482ec3","sha256":"98ea60588adeb0de4e6c995b32f5c25fa4e4e204a31783841e58882499cfe0b3"},"dob":{"date":"1998-02-12T02:29:52.852Z","age":23},"registered":{"date":"2016-04-19T13:20:54.710Z","age":5},"phone":"(680)-111-8370","cell":"(239)-468-8286","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/33.jpg","medium":"https://randomuser.me/api/portraits/med/women/33.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/33.jpg"},"nat":"TR"}],"info":{"seed":"4fa9c347098e7521","results":1,"page":1,"version":"1.3"}
    })
    
    await getUser()
    
    expect(request).toHaveBeenCalled()

})
