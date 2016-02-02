moment.locale('ru', null);

var viewModel = {
	news: ko.observableArray([]),
	feeds: ko.observableArray([]),
	feedsPage: ko.observable(1),
	activeTab: ko.observable(),
	activeNews: ko.observable(),
	isDataWaiting: false,
	feedLayout: function() {
		var c = $('.feeds').mosaicflow({
	    itemSelector: '.feeds-item',
	    minItemWidth: 300
		});
	},
	switchTab: function(tab) {

		if (	viewModel.isDataWaiting) {
			return
		};

		if (tab === 'news') {
			viewModel.showNews()
		} else  if(tab === 'feeds') {
			viewModel.showFeeds()
		}
	},
	newsModal: function(d) {
		viewModel.activeNews(d);
		$('#newsModal').arcticmodal();
	},
	closeModal: function() {
		$.arcticmodal('close')
	} 
};

var Feed = function(feed) {
	//this.date = moment(feed.date).format('LL') || '';
	this.image = feed.image;
	this.id = feed.id;
	//this.image = feed.image;
	this.text = feed.text;
	this.provider = feed.type;
	this.name = feed.user.name;
	this.avatar = feed.user.avatar
}; 

var News = function(news) {
	var d = eval('new ' + (news.Date).split('/')[1]);
	this.date = moment(d).format('LL') || '';
	this.id = news.Id || '';
	this.title = news.Title || '';
	this.text = news.Text || '';
	this.shortText = news.ShortText || '';
	this.image = news.ImageSource || null;
};


viewModel.getData = function(url, cb) {
	$('.news-spinner').show();
	viewModel.isDataWaiting = true;
	$('.news-alert').hide();
	$.getJSON(url, function(data) {
		cb(data);
	}).always(function() {
		viewModel.isDataWaiting = false;
		$('.news-spinner').hide();

  }).fail(function() {
  	$('.news-alert').show()
  }); 
}

viewModel.getNews = function() {
	var url = 'http://events.techdays.ru/News/Json/cdefab88-5f35-4278-a109-4f25a1c6c08e';
	//var url = '966c8085-d48b-4b81-8626-e1e886e7fbde.json';
	viewModel.getData(url, function(data) {
		var _origin = [];
		_.forEach(data, function(item) {
				_origin.push(new News(item));
				//console.log(item)
		});
		viewModel.news(_origin)
	});
};

viewModel.getFeeds = function() {
	$('.news-loadmore').hide();
	var url = 'http://msdevconh.azurewebsites.net/view/Posts?count=' + viewModel.feedsPage();

	viewModel.getData(url, function(data) {

		_.forEach(data, function(item) {
				if (item.image) {
					var img = new Image;
					img.src = item.image;

					img.onload = function() {
						viewModel.feeds.push(new Feed(item));
					}
				} else {
					viewModel.feeds.push(new Feed(item))
				}
		});
		$('.news-loadmore').show();
	});
};

viewModel.moreFeeds = function() {
	viewModel.feedsPage(viewModel.feedsPage() + 1);
	viewModel.getFeeds()
}

viewModel.showNews = function() {
	if (viewModel.news().length === 0) {
			viewModel.getNews();
	};

	if (viewModel.activeTab() === 'news') {
		return
	};

	viewModel.activeTab('news');
};

viewModel.showFeeds = function() {
	viewModel.activeTab('feeds');

	if (viewModel.feeds().length === 0) {
			viewModel.getFeeds();
	};
};

viewModel.showAlert = function() {

};

ko.bindingHandlers.imageLoad = {
    init: function(n, t) {
        var r = t() || {},
            i;
        $(n).css("display", "none");
        i = new Image;
        i.src = r;
        i.onload = function() {
            ko.applyBindingsToNode(n, {
                attr: {
                    src: r
                }
            });
            $(n).fadeIn("300")
        }
    }
};

$(document).ready(function() {
	//moment.locale('ru', null);
	ko.applyBindings(viewModel);

	var locationSearchParam = window.location.search.slice(1).split("=");
	if (locationSearchParam[0] === 'active') {
		viewModel.switchTab(locationSearchParam[1]);
	} else {
		viewModel.switchTab('news');
	}
});

