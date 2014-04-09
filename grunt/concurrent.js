module.exports = {
    first: ['newer:concat','copy'],
    second: ['newer:uglify', 'newer:imagemin'],
    three:['watch']
};