const jwt = require('jsonwebtoken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODYxNDA0MzQsImRhdGEiOn' +
    'sidXNlcklkIjoiMDAxIn0sImlhdCI6MTU4NjE0MDM3NH0.doH0JPNs-fIYbfTcAB_rPfjH9Ie5rS3eU16nlagHHQ0';

jwt.verify(token, 'lowell', function(err,data) {
    if(err) {
        console.log(err)
    }else {
        console.log(data)
    }
});