export const getIndexPage = (req, res) => {
    res.render('index', { link: 'index' })
}

export const getAboutPage = (req, res) => {
    res.render('about', { link: 'about' })
}

export const getRegisterPage = (req, res) => {
    res.render('register', { link: 'register' })
}

export const getLoginPage = (req, res) => {
    res.render('login', { link: 'login' })
}

export const getLogout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1,
    });
    res.redirect('/')
}