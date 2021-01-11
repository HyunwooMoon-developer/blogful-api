function makeUserArray(){
    return [
        {
            id: 1,
            date_created : '2020-01019T22:17:30.615Z',
            fullname: 'Moon Moon',
            username: 'moon@gmail.com',
            password: 'secret',
            nickname : 'moon'
        },
        {
            id:2,
            date_created : '2020-01019T22:17:30.615Z',
            fullname : 'hyun moon',
            username: 'hyun@gmail.com',
            password : 'secret',
            nickname : 'hyun',
        }
    ]
}

module.exports = {
    makeUserArray
}