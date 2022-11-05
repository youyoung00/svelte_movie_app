exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
        name: 'SHIN',
        age: 85,
        email: 'test@test.com'
    })
  }
};