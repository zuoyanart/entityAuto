//由于使用了bower，有很多非必须资源。通过set project.files对象指定需要编译的文件夹和引用的资源
fis.set('statics', ''); //static目录
fis.set('project.ignore', ['sass/**', 'node_modules/**', 'fis-conf.js', 'package.json'])

//FIS modjs模块化方案，您也可以选择amd/commonjs等
fis.hook('module', {
  mode: 'mod'
});

/*************************目录规范*****************************/
fis.hook('relative');
fis.match('**/*', { //启用相对路径支持
    relative: true
  })
  .match("**/*", {
    release: '${statics}/$&'
  })
  .match("**/*.ejs", {
    parser: fis.plugin('ejs'),
    isJsLike: true,
    release: false
  }).match("/^\/site\/ejs\/(.*)\.(tpl)$/i", {
    isJsLike: false,
    release: '${statics}/$&'
  })
  //modules下面都是模块化资源
  .match(/^\/modules\/(.*)\.(js)$/i, {
    isMod: false,
    id: '$1', //id支持简写，去掉modules和.js后缀中间的部分
    release: '${statics}/$&'
  })
  .match(/^\/site\/(.*)\.(js)$/i, {
    isMod: false,
    id: '$1',
    release: '${statics}/$&'
  })
  .match(/^\/view\/(.*)$/i, {
    useCache: false,
    release: '$&'
  })
  //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
  //直接引用为var $ = require('jquery');
  .match(/^\/modules\/([^\/]+)\/\1\.(js)$/i, {
    id: '$1'
  })
  //页面模板不用编译缓存
  .match(/.*\.(html|jsp|tpl|vm|htm|asp|aspx|php)$/, {
    useCache: false
  })

//打包与css sprite基础配置
fis.match('::packager', {
  // npm install [-g] fis3-postpackager-loader
  // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
  postpackager: fis.plugin('loader', {
    resourceType: 'mod',
    obtainScript: true,
    allInOne: false,
    useInlineMap: true, // 资源映射表内嵌
  }),
  packager: fis.plugin('map', {
    useTrack: false,
    'pkg/base.js': ['lib/mui.min.js', 'lib/html5sql.js', 'lib/zepto.min.js', 'lib/config.js'],
    'pkg/base.css': ['/css/pizza.css', '/css/entity.css', '/css/font-awesome.css']
  }),
  spriter: fis.plugin('csssprites', {
    layout: 'matrix',
    margin: '15'
  })
})
