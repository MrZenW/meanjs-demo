(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsListController', ProductsListController);

  ProductsListController.$inject = ['$state', 'ProductsService'];

  function ProductsListController($state, ProductsService) {
    var vm = this;

    vm.products = ProductsService.query();
    
    vm.goCreatePage = goCreatePage;

    function goCreatePage(){
      $state.go('products.create');
    }
  }
}());
