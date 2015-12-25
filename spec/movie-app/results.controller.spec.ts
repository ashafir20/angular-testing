/// <reference path="../../typings/jasmine/jasmine.d.ts" />
describe('Search Controller', () => {
    
    var results = { "Search": [{ "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "imdbID": "tt0076759", "Type": "movie" }, { "Title": "Star Wars: Episode V - The Empire Strikes Back", "Year": "1980", "imdbID": "tt0080684", "Type": "movie" }, { "Title": "Star Wars: Episode VI - Return of the Jedi", "Year": "1983", "imdbID": "tt0086190", "Type": "movie" }, { "Title": "Star Wars: Episode I - The Phantom Menace", "Year": "1999", "imdbID": "tt0120915", "Type": "movie" }, { "Title": "Star Wars: Episode III - Revenge of the Sith", "Year": "2005", "imdbID": "tt0121766", "Type": "movie" }, { "Title": "Star Wars: Episode II - Attack of the Clones", "Year": "2002", "imdbID": "tt0121765", "Type": "movie" }, { "Title": "Star Wars: The Clone Wars", "Year": "2008", "imdbID": "tt1185834", "Type": "movie" }, { "Title": "Star Wars: The Clone Wars", "Year": "2008–2015", "imdbID": "tt0458290", "Type": "series" }, { "Title": "Star Wars: Clone Wars", "Year": "2003–2005", "imdbID": "tt0361243", "Type": "series" }, { "Title": "The Star Wars Holiday Special", "Year": "1978", "imdbID": "tt0193524", "Type": "movie" }] };
    
    var $this;
    var $q;
    var $rootScope;
    var $location;
    var $controller;
    var omdbApi;
    
    beforeEach(angular.mock.module('omdb'));
    beforeEach(angular.mock.module('movieApp'));
    
    beforeEach(inject((_$controller_, _$location_, _$q_, _$rootScope_, _omdbApi_) => {
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
        $location = _$location_;
    }));
    
    it('should redirect to the query results page for non empty query', () => {
        spyOn(omdbApi, 'search').and.callFake(() => {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'star wars'); 
        $this = $controller('ResultsController');
        $rootScope.$apply();
        expect($this.results[0].Title).toBe(results.Search[0].Title);
        expect($this.results[1].Title).toBe(results.Search[1].Title);
        expect($this.results[2].Title).toBe(results.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });
   
    it('should set result status to error', () => {
        spyOn(omdbApi, 'search').and.callFake(() => {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q', 'star wars'); 
        $this = $controller('ResultsController');
        $rootScope.$apply();
        expect($this.errorMessage).toBe('Something went wrong!');
    });
   
    
});