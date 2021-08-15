import request from './request';

jest.mock('./request');

const requestMock = request as jest.MockedFunction<typeof request>;

beforeEach(() => {
    requestMock.mockReset();
});

test("make a request", async() => {

    await request('https://www.testsite.com')

    expect(request).toHaveBeenCalled();
});
