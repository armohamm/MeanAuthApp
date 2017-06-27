const ids = {
    facebook: {
    clientID: '331661003933728',
    clientSecret: '35ac13ddb219c446873c646b32679657',
    callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
  },


  google: {
    clientID: '74387926788-6b1p37eo833pjej8kutqh10ujt3o3v12.apps.googleusercontent.com',
    clientSecret: '5uNKpHlssWVdnWnv5jnLn-tL',
    callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
  },
  linkedin: {
    clientID: '811mkpyqt8qnh9',
    clientSecret: '5nK41mJeJRZG4d3Z',
    callbackURL: 'http://localhost:3000/users/linkedin/callback'
  }
}

module.exports = ids;