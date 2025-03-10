module.exports = {
    helper:require('./helpers'),
    mail:require('./emailService'),
    user:require('./userServices'),
    pdf:require('./pdfService'),
    analytics:require('./analyticsService'),
    restoreDb:require('./restoreService')
}