// See http://brunch.io for documentation.

// For a different structure than /app/ see:
// https://github.com/brunch/brunch/issues/1676

const fs = require('fs');
const settings = require('./app/js/settings.js');
const toReplace = [/index\.html$/,      // index can be used as your main LA page
                   /testPage\.html$/,   // testPate is just for text some headings, buttons, etc
                   /testSmall\.html$/]; // testSmall is for test the footer with small contents

// Don't add head.html above because this replacement is done by ala-boostrap
exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^(?!app)/, // Files that are not in `app/js` dir.
      'js/app.js': /^app\/js/
    }
  },
  stylesheets: {
    joinTo: {
      'css/app.css': /^app\/css/
    }
  }
};

exports.plugins = {
  // TODO add eslint
  babel: {presets: ['latest']},
  copycat: {
    // just copy ALA default builded files to our build
    // These are loaded by ala-bootstrap3 library, so we need to load manually in our development testPage
    'js': [ 'commonui-bs3-2019/build/js/'],
    'material-lite': [ 'app/material-lite' ],
    'custom-bootstrap': [ 'app/custom-bootstrap' ],
    'css': [ 'commonui-bs3-2019/build/css/' ],
    'fonts': 'commonui-bs3-2019/build/fonts/',
    verbose : false, // shows each file that is copied to the destination directory
    onlyChanged: true // only copy a file if it's modified time has changed (only effective when using brunch watch)
  },
  // Maybe use: https://github.com/bmatcuk/html-brunch-static
  replacement: {
    replacements: [
      // Right now this file replacements are only done with `brunch build` and not via the watcher
      // So if you edit them, exec `brunch build` later
      { files: toReplace, match: { find: 'HEADLOCAL_HERE', replace: () => {
        // console.log("Replacing local head");
        return fs.readFileSync('app/assets/headLocal.html', 'utf8');
      }}},
      { files: toReplace, match: { find: 'HEAD_HERE', replace: () => {
        // console.log("Replacing head");
        return fs.readFileSync('app/assets/head.html', 'utf8');
      }}},
      { files: toReplace, match: { find: 'BANNER_HERE', replace: () => {
        // console.log("Replacing banner");
        return fs.readFileSync('app/assets/banner.html', 'utf8');
      }}},
      { files: toReplace, match: { find: 'FOOTER_HERE', replace: () => {
        // console.log("Replacing footer");
        return fs.readFileSync('app/assets/footer.html', 'utf8');
      }}},
      { files: toReplace, match: { find: '::containerClass::', replace: 'container' }},
      { files: toReplace, match: { find: '::headerFooterServer::', replace:
                                   process.env.NODE_ENV === 'development' ?
                                   'http://localhost:3333':
                                   settings.mainLAUrl }},
      { files: toReplace, match: { find: '::loginStatus::', replace: 'signedOut' }},
      { files: toReplace, match: { find: '::loginURL::', replace: `${settings.services.cas.url}/cas/login` }},
      { files: toReplace, match: { find: '::logoutURL::', replace: `${settings.services.cas.url}/cas/logout` }},

      // edit app/js/settings.js before build
      { files: toReplace, match: { find: '::collectoryURL::', replace: settings.services.collectory.url }},
      { files: toReplace, match: { find: '::datasetsURL::', replace: `${settings.services.collectory.url}/datasets`
      }},
      { files: toReplace, match: { find: '::biocacheURL::', replace: settings.services.biocache.url }},
      { files: toReplace, match: { find: '::bieURL::', replace: settings.services.bie.url }},
      { files: toReplace, match: { find: '::regionsURL::', replace: settings.services.regions.url }},
      { files: toReplace, match: { find: '::listsURL::', replace: settings.services.lists.url }},
      { files: toReplace, match: { find: '::spatialURL::', replace: settings.services.spatial.url }},
      { files: toReplace, match: { find: '::casURL::', replace: settings.services.cas.url }},
      { files: toReplace, match: { find: '::imagesURL::', replace: settings.services.images.url }},

      { files: toReplace, match: { find: '::searchServer::', replace: settings.services.bie.url }},
      { files: toReplace, match: { find: '::searchPath::', replace: '/search'}}
    ]
  },
  // This do some var substition in code also:
  jscc: {
    values: {
      _LOCALES_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333': settings.mainLAUrl
    }
  },
  // https://www.npmjs.com/package/brunch-browser-sync
  browserSync: {
    port: 3333,
    open: false // Don't open a browser tab on each modification
  }
  // Also:
  // https://github.com/mikefarah/git-digest-brunch
};

exports.conventions = {
  // file won't be compiled and will be just moved to public directory instead
  ignored: [
    /^app\/material-lite/,
    /^app\/custom-bootstrap/
  ]
};

exports.server = {
  noPushState: true // returns 404 when file not found
  // If you want to test other html page during development
  // indexPath: 'testPage.html'
};

// FIXME, document this
exports.paths = {
  watched: ['app/js', 'app/css', 'app/assets' ]
};

// https://brunch.io/docs/troubleshooting
exports.watcher = {
  awaitWriteFinish: true,
  usePolling: true
}

// exports.optimize = true; // same like brunch build --production
