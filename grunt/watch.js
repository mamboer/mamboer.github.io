module.exports = {
  less: {
    files:["assets/less/**/*.less"],
    tasks:["less"]
  },
  js:{
    files:["assets/js/resume/**/*.js"],
    tasks:["concat","uglify"]
  }
};