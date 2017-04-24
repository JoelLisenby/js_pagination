/**
A google-like pagination html ul generator function.

drawPagination( page, per_page, total_items, number_links )
page: current page
per_page: items per page
total_items: total number of items across all pages
number_links: number of page links to show to the left and/or right of the current page span


updateQueryString( key, value )
key: the name of the querystring variable
value: the value to set for the querystring
**/
var drawPagination = function( element, page, per_page, total_items, number_links) {
	var html = '';
	var links = {};

	var last_page = Math.ceil(total_items / per_page);
	var prevlinks = number_links >= page ? page - 1 : number_links;
	var nextlinks = number_links < last_page - page ? number_links : last_page - page;
	
	var link_cnt = 0;

	// total_items count
	links[link_cnt] = {'text':'found '+ total_items, 'url':null};
	
	// prev link
	if(page > 1) {
		link_cnt++;
		links[link_cnt] = {'text':'Prev','url':updateQueryString('pg',page-1)};
	}
	
	// prevlinks
	for(var i = page - prevlinks; i < page; i++) {
		link_cnt++;
		links[link_cnt] = {'text':i,'url':updateQueryString('pg',i)};
	}
	
	// current page link
	link_cnt++;
	links[link_cnt] = {'text':page,'url':null};

	// nextlinks
	for(var i = page + 1; i <= page + nextlinks; i++) {
		link_cnt++;
		links[link_cnt] = {'text':i,'url':updateQueryString('pg',i)};
	}

	// next link
	if(page < last_page) {
		link_cnt++;
		links[link_cnt] = {'text':'Next','url': updateQueryString('pg',parseInt(page) + 1)};
	}
	
	html += '<ul class="pagination">';
	for(var prop in links) {
		html += '<li>';
		if(links[prop].url !== null) {
			html += '<a href="'+ links[prop].url +'">'+ links[prop].text +'</a>';
		} else {
			html += '<span>'+ links[prop].text +'</span>';
		}
		html += '</li>';
	}
	html += '</ul>'
	
	element.innerHTML = html;
};

var updateQueryString = function(key, value) {
	var uri = window.location.href;
	var i = uri.indexOf('#');
	var hash = i === -1 ? ''  : uri.substr(i);
	uri = i === -1 ? uri : uri.substr(0, i);

	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		uri = uri.replace(re, '$1' + key + "=" + value + '$2');
	} else {
		uri = uri + separator + key + "=" + value;
	}
	return uri + hash;
};