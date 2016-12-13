window.utils = {

	//Backbone template loader by Rommel V. Bulalacao

	loadTemplate: function(views, callback) {
		var deferreds = [];
		$.each(views, function(index, view) {
			if (window[view]) {
				return deferreds.push($.get('tpl/' + view + '.html', function(data) {
					window[view].prototype.template = _.template(data);
					console.log('View and template found :  tpl/' + view + '.html');
				}));

			} 
			
			console.log('Did not find view for tpl/' + view + '.html');
			
		});
		$.when.apply(null, deferreds).done(callback);
	}

}



