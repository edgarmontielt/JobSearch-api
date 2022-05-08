
const tokenToCookie = (res, data) => {
    if (data.success) {
        let date = new Date(new Date().setDate(new Date().getDate() + 7))
        return res.cookie('token', data.token, {
            httpOnly: true,
            sameSite: 'none',
            secure: 'true',
            expires: date
        }).json(data.data)
    }
    return res.json(data)
}

module.exports = { tokenToCookie }