/// <reference path="../../typings/jasmine/jasmine.d.ts" />

describe('Search Controller', () => {
    it('should redirect to the query results page for non empty query', () => {
        var $scope = {};
        var $location = {};
        
        $scope.search = () => {
            $location.url = 'results?q=star%20wars';
        }
        
        $scope.query = 'star wars';
        $scope.search();
        
       expect($location.url).toBe('results?q=star%20wars');
    });
    
    it('should not redirect to query results for empty query', () => {
        $scope.query = '';
        $scope.search();
        expect($location.url).toBe('');
    });
});