(function () {
  'use strict';

  angular
    .module('articles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('articles.list', {
        url: '',
        templateUrl: '/modules/articles/client/views/list-articles.client.view.html',
        controller: 'ArticlesListController',
        controllerAs: 'vm'
      })
      .state('articles.view', {
        url: '/:articleId',
        templateUrl: '/modules/articles/client/views/view-article.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: '{{ articleResolve.title }}'
        }
      })
      .state('products', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('products.list', {
        url: '',
        templateUrl: '/modules/articles/client/views/products-list.client.view.html',
        controller: 'ProductsListController',
        controllerAs: 'vm'
      })
      .state('products.create', {
        url: '/create',
        templateUrl: '/modules/articles/client/views/product-create.client.view.html',
        controller: 'ProductsCreateController',
        controllerAs: 'vm',
        resolve: {
          productResolve: newProduct,
          createCategoryResolve: createCategory,
          getCategoriesResolve: getCategories
        }
      })
      .state('products.update', {
        url: '/update/:_id',
        templateUrl: '/modules/articles/client/views/product-create.client.view.html',
        controller: 'ProductsCreateController',
        controllerAs: 'vm',
        resolve: {
          createCategoryResolve: createCategory,
          getCategoriesResolve: getCategories,
          productResolve: getProduct
        }
      })
      .state('products.view', {
        url: '/:_id',
        templateUrl: '/modules/articles/client/views/product-view.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: getProduct
        },
        data: {
        }
      })
      .state('products.picture', {
        url: '/picture/:_id',
        templateUrl: '/modules/articles/client/views/product-picture.client.view.html',
        controller: 'ProductsPictureController',
        controllerAs: 'vm',
        resolve: {
        },
        data: {
        }
      })
      ;
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];
  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  getProduct.$inject = ['$stateParams', 'ProductsService'];
  function getProduct($stateParams, ProductsService) {
    return ProductsService.get({
      _id: $stateParams._id
    }).$promise;
    // return ProductsService;
  }

  getCategories.$inject = ['$stateParams', 'CategoriesService'];
  function getCategories($stateParams, CategoriesService) {
    return CategoriesService.query();
  }

  newProduct.$inject = ['ProductsService'];
  function newProduct(ProductsService) {
    return new ProductsService();
  }

  createCategory.$inject = ['$stateParams', 'CategoriesService'];
  function createCategory($stateParams, CategoriesService) {
    return function () {
      return new CategoriesService();
    };
  }
}());
