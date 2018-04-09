(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Articles',
    //   state: 'articles',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'articles', {
    //   title: 'List Articles',
    //   state: 'articles.list',
    //   roles: ['*']
    // });

    menuService.addMenuItem('topbar', {
      title: 'Products',
      state: 'products',
      type: 'dropdown',
      roles: ['*']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'products', {
      title: 'List Products',
      state: 'products.list',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'products', {
      title: 'Create a product',
      state: 'products.create',
      roles: ['*']
    });
  }
}());
