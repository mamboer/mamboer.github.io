module.exports = {

    options: {
        cache: false
    },

    dist: {
        files: [{
            expand: true,                // Enable dynamic expansion
            cwd: 'assets/img/',              // src matches are relative to this path
            src: ["**/*.{png,jpg,gif}"], // Actual patterns to match
            dest: 'assets/dist/img/'            // Destination path prefix
        }]
    }
};