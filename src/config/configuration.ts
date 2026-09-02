
export default () => ({
    appPort: process.env.PORT || 8081,
    jwtSecret: process.env.JWT_SECRET,
    
})