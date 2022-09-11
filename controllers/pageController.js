export const getIndexPage = (req, res) => {
    res.render('index', { link: 'index' })
}

export const getAboutPage = (req, res) => {
    res.render('about', { link: 'about' })
}

export const getRegisterPage = (req, res) => {
    res.render('register', { link: 'register' })
}