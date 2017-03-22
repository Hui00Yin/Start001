var del = require("del");                   // used to clear folders before building

module.exports = function(dest, forceClean) {
    return del(dest, { force: forceClean }); // , { force:true } // force:true is needed to delete folders not in the current one
}