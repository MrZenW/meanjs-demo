(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$state', '$scope', '$sce', 'productResolve', 'CategoriesService', 'Authentication'];

  function ProductsController($state, $scope, $sce, product, CategoriesService, Authentication) {
    var vm = this;
    // product.description = $sce.trustAsHtml(product.description.replace(/\n/g,"<br/>"));
    // console.log(product, 'product~~~');
    // console.log(product.category);
    // CategoriesService.query().findOne({ _id: { $in: product.category } }).exec(function (data) {
    //   console.log(data, '#####dd');
    // });
    vm.product = product;
    vm.goProductImage = goProductImage;
    vm.goProductUpdatePage = goProductUpdatePage;

    function goProductImage() {
      $state.go('products.picture', {
        _id: vm.product._id
      });
    }
    function goProductUpdatePage() {
      $state.go('products.update', {
        _id: vm.product._id
      });
    }
    // vm.authentication = Authentication;

  }
}());
