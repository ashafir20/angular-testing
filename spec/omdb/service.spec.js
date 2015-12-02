describe('omdb service', function () {

	var movieData = {"Search":[{"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","imdbID":"tt0076759","Type":"movie"},{"Title":"Star Wars: Episode V - The Empire Strikes Back","Year":"1980","imdbID":"tt0080684","Type":"movie"},{"Title":"Star Wars: Episode VI - Return of the Jedi","Year":"1983","imdbID":"tt0086190","Type":"movie"},{"Title":"Star Wars: Episode I - The Phantom Menace","Year":"1999","imdbID":"tt0120915","Type":"movie"},{"Title":"Star Wars: Episode III - Revenge of the Sith","Year":"2005","imdbID":"tt0121766","Type":"movie"},{"Title":"Star Wars: Episode II - Attack of the Clones","Year":"2002","imdbID":"tt0121765","Type":"movie"},{"Title":"Star Wars: The Clone Wars","Year":"2008","imdbID":"tt1185834","Type":"movie"},{"Title":"Star Wars: The Clone Wars","Year":"2008–2015","imdbID":"tt0458290","Type":"series"},{"Title":"Star Wars: Clone Wars","Year":"2003–2005","imdbID":"tt0361243","Type":"series"},{"Title":"The Star Wars Holiday Special","Year":"1978","imdbID":"tt0193524","Type":"movie"}]};
	var movieDataById = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the universe from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 38 wins & 27 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg","Metascore":"92","imdbRating":"8.7","imdbVotes":"764377","imdbID":"tt0076759","Type":"movie","Response":"True"};
	
	

	//you can use modules that dont exits yet in the app (for brainstorming as an example)
	//first method : anonymous module object
	
	// angular.mock.module({
	// 	'ombdbApi': {
	// 		search: function(query) {
	// 			return movieData;
	// 		}
	// 	}
	// });
	
	//second method: using angulars provide function (supports adding dependencies)
	// angular.mock.module(function($provide){
	// 	$provide.factory('omdbApi', function(){
	// 		return {
	// 			search: function(query) {
	// 				return movieData;
	// 			}		
	// 		}
	// 	});
	// });
	
	var omdbApi = {};
	var $httpBackend;

	//beforeEach is a jasmin's helper method
	beforeEach(module('omdb'));

	beforeEach(inject(function(_omdbApi_, _$httpBackend_) {
		omdbApi = _omdbApi_;
		$httpBackend = _$httpBackend_;
	}));

	it('should return search movie data', function() {
		//console.log(angular.mock.dump(movieData));
		expect(omdbApi.search('star wars')).toEqual(movieData);
	});

	it('should return movie data by id', function() {
		expect(omdbApi.find('tt0076759')).toEqual(movieDataById);
	});
	
	/************************************
	 *summary
	 -----------------
		module -> used to load our modules
		inject -> used to get instances of components from modules
		dump -> Serializes common objects for debugging
	*/
	
	it('should return search movie data using api', function() {
		var response;
		
		
		//var expectedUrl = 'http://wwww.omdbapi.com/?v=1&s=star%20wars';
		var expectedUrl = function(url) {
			return url.indexOf('http://wwww.omdbapi.com') !== -1;
		}
		
		$httpBackend.when('GET', expectedUrl)
			.respond(200, movieData);
		
		omdbApi.searchApi('star wars')
			.then(function(data){
				response = data;
			})
		
		$httpBackend.flush();	
		
		expect(response).toEqual(movieData);
	});
	
	it('should handle error', function() {
		var response;
		
		var expectedUrl = 'http://wwww.omdbapi.com/?v=1&i=tt0076759';

		$httpBackend.expect('GET', expectedUrl)
			.respond(500, movieDataById);
		
		omdbApi.findApi('tt0076759')
			.then(function(data){
				response = data;
			})
			.catch(function() {
				response = 'Error!';
			});
		
		$httpBackend.flush();	
		
		expect(response).toEqual('Error!');
	});
		
	it('should return search movie data by id using api', function() {
		var response;
		
		var expectedUrl = 'http://wwww.omdbapi.com/?v=1&i=tt0076759';

		$httpBackend.expect('GET', expectedUrl)
			.respond(200, movieDataById);
		
		omdbApi.findApi('tt0076759')
			.then(function(data){
				response = data;
			})
		
		$httpBackend.flush();	
		
		expect(response).toEqual(movieDataById);
	});
	
		
	/************************************
	 *summary
	 -----------------
		when -> specifies a backend definition
		expect -> specifies a request expctation
	*/
});


