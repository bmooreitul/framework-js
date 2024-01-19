//ITUL OPTIONS
let itulOptions = {	
	files: {
		uploadUrl: '/files/upload',
	},
	spinner: false,
}

$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	},
	error: function(jqXHR, textStatus, errorThrown){
		spinner('hide');
		try{
			toastr.error(errorThrown+'<br>'+jqXHR.responseJSON.message, 'An Error occured');
		}
		catch(e){
			//SILENT
		}
	}
});

//--------------------------------------- BEGIN SPINNER LISTENERS AND FUNCTIONS -------------------------//

function spinner(show){

	if(!itulOptions.spinner) return;

	if(show == 'hide'){
		$('.loader-overlay-wrap').fadeOut(500, function(){
			$('.loader-overlay-wrap').remove();
		});
		return;
	}
	
	$('.loader-overlay-wrap').remove();
	$('body').append('<div class="loader-overlay-wrap"><div class="loader-overlay">Loading...</div></div>');
}

$(document).off('click.ShowLoaderLink').on('click.ShowLoaderLink', '.show-loader', function(){
	spinner();
});

//--------------------------------------- END SPINNER LISTENERS AND FUNCTIONS -------------------------//






//--------------------------------------- BEGIN TINYMCE LISTENERS AND FUNCTIONS -------------------------//

	// Prevent Bootstrap dialog from blocking focusin
	document.addEventListener('focusin', function (e) { if (e.target.closest('.tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) { e.stopImmediatePropagation(); } });

//--------------------------------------- END TINYMCE LISTENERS AND FUNCTIONS -------------------------//





//--------------------------------------- BEGIN FILL HEIGHT LISTENERS AND FUNCTIONS -------------------------//

var fillHeightResizeTimer;
var triggerResizeOnScroll = true;

function init_fill_height(trigger = true){

	$(window).on('resize', function(){
		$(window).trigger('scroll.FillHeightScroll');		
	});

	//var window_height = $(window).height();
	var window_height = window.innerHeight;
	$.each($('.fill-height'), function(){
		$(this).css('height', '');
		var offset_top = $(this)[0].getBoundingClientRect().top;
		if(typeof($(this).data('scroll_top_position')) == 'undefined') $(this).data('scroll_top_position', 0);
		if(typeof($(this).data('scroll_left_position')) == 'undefined') $(this).data('scroll_left_position', 0);
		var current_scrollTop = $(this).data('scroll_top_position');
		var current_scrollLeft = $(this).data('scroll_left_position');
		var offset_bottom = typeof($(this).attr('data-offset_bottom')) !== 'undefined' ? $(this).attr('data-offset_bottom') : 0;

		//console.log(offset_top);
		
		new_height = window_height-offset_top;

		if(typeof($(this).attr('data-max-window')) !== 'undefined'){
			new_height = window_height;
			if(offset_top > 1) new_height -= $(this).attr('data-max-window');
		}

		if(offset_bottom) new_height -= offset_bottom;


		if($(this).attr('data-max-height') == 'true' && new_height < $(this).height()){
			$(this).height(new_height);
			$(this).css('overflow','auto');
		}
		else if($(this).attr('data-max-height') == 'false' || typeof($(this).attr('data-max-height')) == 'undefined'){
			$(this).height(new_height);
			$(this).css('overflow','auto');
		}

		$(this).scroll(function(){
			current_scrollTop = $(this).scrollTop();
			current_scrollLeft = $(this).scrollLeft();
			$(this).data('scroll_top_position', current_scrollTop);
			$(this).data('scroll_left_position', current_scrollLeft);
		});

		$(this).scrollTop(current_scrollTop);
		$(this).scrollLeft(current_scrollLeft);
	});

	if(trigger){
		$(window).trigger('scroll.FillHeightScroll');

		$(window).off('scroll.FillHeightScroll').on('scroll.FillHeightScroll', function(e){
			clearTimeout(fillHeightResizeTimer);
			fillHeightResizeTimer = setTimeout(function(){
				init_fill_height(false);
			}, 10);	
		});
	}
}

//--------------------------------------- END FILL HEIGHT LISTENERS AND FUNCTIONS -------------------------//




//--------------------------------------- BEGIN AJAX LISTENERS AND FUNCTIONS -------------------------//



	//--------------------------------------- BEGIN AJAX FORM LISTENERS AND FUNCTIONS -------------------------//

	$(document).off('submit.ajaxForm').on('submit.ajaxForm', '.ajax-form', function(e){
		e.preventDefault();

		if($(this).hasClass('ajax-form-submitting')) return;

		spinner();

		callback_name       = $(this).attr('callback');
		error_callback 		= $(this).attr('error_callback');
		ele                 = $(this);
		var formdata        = new FormData($(this)[0]);
		var submit_button   = $(document.activeElement);
		var json            = $(this).attr('data-json') == 'true' ? true : false;
		$(this).addClass('ajax-form-submitting');
		var hideSpinner = false;
		if($(this).attr('data-hide-spinner') !== 'false') hideSpinner = true;


		if(typeof(submit_button.context) != 'undefined' && submit_button.context.type == 'submit'){
			if(typeof $(submit_button).attr('name') !== undefined){
				var name = $(submit_button).attr('name');
				var value = true;

				if(typeof $(submit_button).attr('value') !== undefined){
					value = $(submit_button).attr('value');
				}

				formdata.append(name, value);
			}
		}

		$.ajax({
			url: $(this).attr('action'),
			type: typeof($(this).attr('method')) !== 'undefined' ? $(this).attr('method') : 'get',
			data: formdata,
			processData: false,
			contentType: false,
			success: function(data){
				$(ele).removeClass('ajax-form-submitting');
				if(typeof(window[callback_name]) == 'function'){
					window[callback_name](data, ele)
				}
			},
			error: function(data){
				$(ele).removeClass('ajax-form-submitting');
				if(typeof(window[error_callback]) == 'function'){
					window[error_callback](data, ele, data.responseJSON)
				}
			}
		}).done(function(){
			$(ele).removeClass('ajax-form-submitting');
			if(hideSpinner) spinner('hide');
		});
	});

	//--------------------------------------- END AJAX FORM LISTENERS AND FUNCTIONS -------------------------//




	//--------------------------------------- BEGIN AJAX FILE LISTENERS AND FUNCTIONS -------------------------//

		//UPLOAD FILES VIA AJAX
	function ajax_file_upload(event, meta, callback, add_files){

		//STOP STUFF FROM HAPPENING
		event.stopPropagation();
		event.preventDefault();

		var uploadUrl = typeof($(event.target).attr('data-uploadurl')) == 'undefined' ? itulOptions.files.uploadUrl : $(event.target).attr('data-uploadurl');

		var files = typeof(add_files) !== 'undefined' ? add_files : event.target.files;

		hideSpinner = false;
		if($(event.target).attr('data-hide-spinner') !== 'true') hideSpinner = true;

		//SHOW THE SPINNER
		spinner();

		//ADD THE FILES
		var data = new FormData();
		$.each(files, function(key, value){ data.append(key, value); });

		//ADD THE META DATA
		$.each(meta, function(k, v){  data.append(k, v); });

		//SEND IT OFF
		$.ajax({
			url         : uploadUrl,
			type        : 'POST',
			data        : data,
			cache       : false,
			dataType    : 'json',
			processData : false, // Don't process the files
			contentType : false, // Set content type to false as jQuery will tell the server its a query string request
			success     : function(data, textStatus, jqXHR) {
				if(typeof callback == 'function'){
				   if(hideSpinner) spinner('hide');
					callback(data);
				}
			},
		}).done(function(){
			if(typeof(callback) !== 'function'){
				spinner('hide');
			}	   
		});
	}


	//AJAX FILE UPLOAD INPUT LISTENER
	$(document).off('change.AjaxFileUpload').on('change.AjaxFileUpload', '.ajax_file_upload', function(e){

		//PREVENT BUBBLING
		e.stopPropagation();

		//GET THE CALLBACK NAME
		var callback_name = $(this).data('callback');

		//SET THE CALLING ELEMENT
		var ele = $(this);

		//UPLOAD THE FILES
		ajax_file_upload(e, $(this).data(), function(data){

			//RESET THE INPUT VALUE WHEN DONE
			$(ele).val('');

			if(typeof(window[callback_name]) == 'function'){
				window[callback_name](data, ele);
			}
			else{
				spinner('hide');
			}
		});
	});

	//--------------------------------------- END AJAX FILE LISTENERS AND FUNCTIONS -------------------------//




	//--------------------------------------- BEGIN DRAG AND DROP FILE UPLOADS -------------------------//

	$("html").off('dragover.dragFile.html.DragAndDropFileUpload').on('dragover.dragFile.html.DragAndDropFileUpload', function(event) {
		event.preventDefault();
	});

	$("html").off('dragleave.dragLeaveFile.html.DragAndDropFileUpload').on('dragleave.dragLeaveFile.html.DragAndDropFileUpload', function(event) {
		event.preventDefault();
	});

	$("html").off('drop.dropFile.html.DragAndDropFileUpload').on('drop.dropFile.html.DragAndDropFileUpload', function(event) {
		event.preventDefault();
	});

	$(document).off('dragover.dragFile.DragAndDropFileUpload').on('dragover.dragFile.DragAndDropFileUpload', '.drag-and-drop-file-upload', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).addClass('dragging-over');
	});

	$(document).off('dragleave.dragLeaveFile.DragAndDropFileUpload').on('dragleave.dragLeaveFile.DragAndDropFileUpload', '.drag-and-drop-file-upload', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).removeClass('dragging-over');
	});

	$(document).off('drop.dropFile.DragAndDropFileUpload').on('drop.dropFile.DragAndDropFileUpload', '.drag-and-drop-file-upload', function(event) {

		event.preventDefault();
		event.stopPropagation();

		var callbackName    = typeof($(this).attr('data-callback')) !== 'undefined' ? $(this).attr('data-callback') : null;
		var multiFile       = typeof($(this).attr('data-multifile')) !== 'undefined' && $(this).attr('data-multifile') == 'true' ? true  : false;
		//renderFileUploadProgress(event, callbackName, multiFile);
		//renderFileUploadProgressSynchronous(event, callbackName, multiFile);
		var ele = $(this);

		ajax_file_upload(event, $(this).data(), function(data){
			if(typeof(window[callbackName]) == 'function'){
				window[callbackName](data, ele);
			}
			else{
				spinner('hide');
			}
		}, event.originalEvent.dataTransfer.files);

	});

	//--------------------------------------- END DRAG AND DROP FILE UPLOADS -------------------------//

	//--------------------------------------- BEGIN AJAX LINK LISTENING -------------------------//

	var ajaxLinkTrigger;


	$(document).off('click.ajaxLink').on('click.ajaxLink', '.ajax-link:not([disabled])', function(e){

		//PREVENT FROM DOING ANYTHING ELSE
		e.preventDefault();
		e.stopPropagation();

		//SHOW THE SPINNER
		spinner();

		//PARSE THE ATTRIBUTES
		var callback_name   = $(this).attr('callback');
		var ele             = $(this);
		var target          = $(this).attr('data-element') !== undefined ? $($(this).attr('data-element')) : false;
		var url             = $(this).attr('data-url') !== undefined ? $(this).attr('data-url') : $(this).attr('href');
		var callback_type   = $(this).attr('data-callback_type') !== undefined ? $(this).attr('data-callback_type') : 'html';
		var replace_empty   = $(this).attr('data-replace_empty') !== undefined ? $(this).attr('data-replace_empty') : 'true';
		var requestType     = $(this).attr('method') !== undefined ? $(this).attr('method') : 'post';
		var replace         = true;
		var run_ajax        = true;
		if(replace_empty == 'false' && $(target).html().trim().length) replace = false;
		if(!replace && callback_type != 'remove') run_ajax = false;
		ajaxLinkTrigger = $(this);


		if(run_ajax){

			var newData = {};
			var startData = $(this).data();
			for(var x in startData){
				if(typeof(startData[x]) !== 'object'){
					newData[x] = startData[x];
				}
			}

			//GET AND FORMAT SEND DATA
			//var send_data   = JSON.parse(JSON.stringify($(this).data()));
			var send_data   = JSON.parse(JSON.stringify(newData));

			$.ajax({
				url: url,
				type: requestType,
				data: send_data,
				success: function(data){

					if(target){
						if(callback_type == 'remove'){
							$(target).remove();
						}
						else{
							$(target)[callback_type](data);
						}
					}

					if(typeof(window[callback_name]) == 'function'){
						window[callback_name](data, ele)
					}
					else if(typeof(callback_name) == 'function'){
						callback_name(data, ele);
					}
					else{
						spinner('hide');
					}
				}
			});
		}
		else{
			spinner('hide');
		}
	});
	//--------------------------------------- END AJAX LINK LISTENING -------------------------//





	//--------------------------------------- BEGIN AJAX MODAL LISTENING AND FUNCTIONS -------------------------//

	var modalTrigger;

	function triggerAjaxModal(url, title, d, closeCallback){
		var ele = $('<a class="modal-link" method="get" title="'+(title != undefined ? title : '')+'" href="'+url+'"></a>');
		if(typeof(d) == 'object'){
			console.log(d);
			for(var x in d){
				if(x !== 'ajax_form_callback' && x !== 'data-width'){
					var v = d[x];

					if(x == 'method'){
						$(ele).attr('method', v);
					}
					else if(x == 'modal-size'){
						$(ele).attr('data-modal-size', v);
					}
					else if(x == 'modal-size'){
						$(ele).attr('data-modal-size', v);
					}
					else{
						try {
							v = $.parseJSON(v);
							$(ele).data(x, v);
						}
						catch(e){
							if(typeof(v) != 'function'){						
								$(ele).data(x, v);
							}
						}
					}				
				}
			}
		}
		$(ele).appendTo($('body')).trigger('click').on('it.modal.created', function(e, modal){
			//$(ele).remove();
			//$(document).trigger('itul.livewire.rescan');;
			if(typeof(closeCallback) == 'function'){
				$(modal).on('hide.bs.modal', function(){
					closeCallback($(modal));
				});
			}
		});	
	}

	$(document).off('click.ModalLink').on('click.ModalLink', '.modal-link', function(e){
		e.preventDefault();
		e.stopPropagation();

		//console.log($(this));

		//REMOVE EXISTING MODAL IF NEEDED
		if($('#ajax-modal').length) $('#ajax-modal').remove();

		//SET THE MODAL TRIGGER ELEMENT
		modalTrigger 			= $(this);

		//SET DEFAULTS
		var url 				= $(this).attr('href');
		var title				= typeof($(this).attr('title')) !== 'undefined' ? $(this).attr('title') : '';
		var addn_class			= typeof($(this).attr('modal-content-class')) !== 'undefined' ? $(this).attr('modal-content-class') : '';
		var addn_dialog_class	= typeof($(this).attr('modal-dialog-class')) !== 'undefined' ? $(this).attr('modal-dialog-class') : '';
		var size 				= typeof($(this).attr('data-modal-size')) !== 'undefined' ? $(this).attr('data-modal-size') : 'modal-lg';
		var dismissable 		= typeof($(this).attr('data-modal-dismissable')) !== 'undefined' && $(this).attr('data-modal-dismissable') == 'false' ? false : true;
		var dismissButton 		= dismissable ? '<button type="button" data-bs-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>' : '';


		if(url.indexOf('#') >= 0){
			$(url).modal('show');
			return;
		}
		
		var modal_header =
			'<div class="modal-header">' +
				'<h5 class="modal-title d-inline-block">' + title + '</h5>'+
				dismissButton+
			'</div>';


		if(title == '' && !dismissable) modal_header = '';

		var modal_options = {
			backdrop: dismissable ? true : 'static',
			keyboard: dismissable ? true : false,
			show: true
		}

		var data = {};
		var ele = $(this);
		if(typeof($(ele).data()) !== 'undefined'){
			var d = $(ele).data();
			for(var x in d){
				if(x !== 'ajax_form_callback' && x !== 'data-width'){
					var v = d[x];
					try {
						v = $.parseJSON(v);
						data[x] = v;
					}
					catch(e){
						data[x] = v;
					}
				}
			}
		}

		$.ajax({
			url: url,
			type: typeof($(this).attr('method')) !== 'undefined' ? $(this).attr('method') : 'get',
			headers: {
				'X-MODAL':'true',
			},
			data: data,
			success: function(data){

				//var footer = $(data).find('.modal-footer').length;

				var m = $(
					'<div class="modal fade" id="ajax-modal" tabindex="-1" role="dialog" aria-hidden="true">'+
						'<div class="modal-dialog '+addn_dialog_class+' '+size+'" role="document">'+
							'<div class="modal-content' + addn_class + '">'+
								modal_header+
								'<div class="modal-body">'+
									data+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'
				);

				//PLACE THE FOOTER CORRECTLY
				if($(m).find('.modal-footer').length) $(m).find('.modal-footer').appendTo($(m).find('.modal-content'));

				$(m).on('hidden.bs.modal', function(){
					$(this).remove();
				}).on('hide.bs.modal', function(){
					setTimeout(function(){
						try{
							tinymce.remove('#ajax-modal textarea');
						}
						catch{
							//SILENT
						}
						
					}, 300);
				});

				//ADD THE FOOTER
				$('body').append($(m));
				$(m).modal(modal_options);
				if(modal_options.show === true) $(m).modal('show');

				/*
				$(m).on('shown.bs.modal', function(){
					$(document).trigger('itul.livewire.rescan');
				});
				*/

				$(modalTrigger).trigger('it.modal.created', [$(m)]);
			}
		})
	});

	//--------------------------------------- END AJAX MODAL LISTENING AND FUNCTIONS -------------------------//

	


//--------------------------------------- BEGIN COPY TO CLIPBOARD LISTENERS -------------------------//

	$(document).off('click.copyToClipboard').on('click.copyToClipboard', '.copy-to-clipboard', function(e){
		e.preventDefault();
		e.stopPropagation();

		var target = $($(this).attr('data-target'));
		var copyText = $(target)[0];

		$(this).addClass('btn-success');
		$(target).addClass('border-success border');

		var that = $(this);

		setTimeout(function(){
			$(that).removeClass('btn-success');
			$(target).removeClass('border-success border');

		}, 2000);

		/* Select the text field */
		copyText.select();

		/* Copy the text inside the text field */
		document.execCommand("copy");

	});

//--------------------------------------- END COPY TO CLIPBOARD LISTENERS -------------------------//





//--------------------------------------- BEGIN BOOTSTRAP TAB MEMORIZATION -------------------------//


	//MEMORIZE BOOTSTRAP TAB CHANGES
	$(document).on('shown.bs.tab', function(e){
		var target = $(e.target);

		if($(target).closest('.nav-tabs').hasClass('nocache')) return true;

		var theTabId = $(target).data('bs-target');
		var activeTabs = (window.localStorage.getItem(e.target.baseURI+'-activeTab') ? window.localStorage.getItem(e.target.baseURI+'-activeTab').split(',') : []);
		var $sameLevelTabs = $(target).parents('.nav-tabs').find('[data-bs-toggle="tab"]');

		$.each($sameLevelTabs, function (index, element) {
	        var tabId = $(element).data('bs-target');
	        if(theTabId != tabId && activeTabs.indexOf(tabId) !== -1){
	            activeTabs.splice(activeTabs.indexOf(tabId), 1);
	        }
	    });

	    //unique tabs
	    if (activeTabs.indexOf($(target).data('bs-target')) === -1) {
	        activeTabs.push($(target).data('bs-target'));
	    }

	    window.localStorage.setItem(e.target.baseURI+'-activeTab', activeTabs.join(','));

	    init_fill_height();
	});

	$(document).off('memorized.tabs.show').on('memorized.tabs.show', function(){
		

		var goto = window.localStorage.getItem('display-tab-on-next-load');
		if(goto){

			var eles = goto.split(',');

			$.each(eles, function(index, element){

				//TRY TO LOAD THE TARGET TAB ELEMENT
				var targetTab = $('[data-bs-toggle="tab"][data-bs-target="'+element+'"]');

				//TRY TO SWITCH THE TAB
				if($(targetTab).length){
					var targetEle = $(element);
					if($(targetEle).length){
						if(!$(targetEle).hasClass('active')){
							(new bootstrap.Tab(targetTab)).show();
						}
					}
				}
			})

			
			window.localStorage.removeItem('display-tab-on-next-load');
		}
		else{
			var activeTabs = window.localStorage.getItem(window.location.href+'-activeTab');
			if (activeTabs) {
			    var activeTabs = (window.localStorage.getItem(window.location.href+'-activeTab') ? window.localStorage.getItem(window.location.href+'-activeTab').split(',') : []);
			    $.each(activeTabs, function (index, element) {

			    	//TRY TO LOAD THE TARGET TAB ELEMENT
					var targetTab = $('[data-bs-toggle="tab"][data-bs-target="'+element+'"]');

					//TRY TO SWITCH THE TAB
					if($(targetTab).length){
						var targetEle = $(element);
						if($(targetEle).length){
							if(!$(targetEle).hasClass('active')){
								(new bootstrap.Tab(targetTab)).show();
							}
						}
					}
			    });
			}
		}
	});

	$(document).off('click.Itul.GoToTab').on('click.Itul.GoToTab', 'a.go-to-tab', function(){
		window.localStorage.setItem('display-tab-on-next-load', $(this).data('goto'));
	});

	$(function(){
		$(document).trigger('memorized.tabs.show');
		$('.mask-input').trigger('keyup.inputMasker');
	});

//--------------------------------------- END BOOTSTRAP TAB MEMORIZATION -------------------------//


//--------------------------------------- NESTED TABLES CONFORM SIZES -------------------------//
	
	$.NtConform = function(options){
	
		$.fn.extend({
			ntConform: function(options){
	
				//ASSIGN THE CLASS FOR CHILDREN TABLES
				$('.nt-conform').find('table:not(.nt-conform)').addClass('nt-conform');
	
				//INITIALIZE THE TABLES
				$.each($('.nt-conform:not(.nt-conform-initialized)'), function(key, val){
					if(!$(val).parents('.nt-conform').length) $(val).addClass('nt-conform-source');
					else $(val).parents('.nt-conform').each(function(k, v){ if(!$(v).closest('.nt-conform').length) $(v).addClass('nt-conform-source'); });
					$(val).addClass('nt-conform-initialized');
				});
	
				//SET THE WIDTHS ON ALL INHERITING TABLES
				$.each($('.nt-conform'), function(key, val){ if(!$(val).hasClass('nt-conform-source') && $(val).closest('.nt-conform-source').length) $.each($(val).closest('.nt-conform-source').children('thead').find('th'), function(k, v){ $(val).children('tbody').find('tr > td').eq(k).css('width', $(v).css('width')); }); });
				var ntConformWindowResizeTimer;
				$(window).off('resize.NtConform.WindowResize').on('resize.NtConform.WindowResize', function(){
					ntConformWindowResizeTimer = setTimeout(function(){
						clearTimeout(ntConformWindowResizeTimer);
						$('.nt-conform').ntConform();
					}, 50);
				})
			}
		});
	
		$('.nt-conform:not(.nt-conform-initialized)').ntConform();
	}

//--------------------------------------- END NESTED TABLES CONFORM SIZES -------------------------//


//--------------------------------------- INPUT MASKING CUSTOM LISTENERS AND FUNCTIONS -------------------------//

	/*
	*
	* INPUT MASKING USAGE
	*
	* To mask data on a text field just add the class "hover-unmask". This will convert the field into a password field and only display the value when hovering
	* To mask data into a format of either phone,date or social security number just add the class "input-mask" and the data-type="{type}". Repace type with one of the options (phone,date,ssn)
	*
	*/

	//SET THE INITIAL MASKING
	$('input[type="text"].hover-unmask').attr('type', 'password');

	//UNMASK VALUE ON HOVER
	$(document).off('mouseenter.HoverUnmask mouseleave.HoverUnmask').on('mouseenter.HoverUnmask', 'input[type="password"].hover-unmask', function(){
	    $(this).attr('type', 'text');
	});

	//MASK VALUE ON HOVER
	$(document).off('mouseleave.HoverUnmask').on('mouseleave.HoverUnmask', 'input[type="text"].hover-unmask', function(){
	    $(this).attr('type', 'password');
	});

	//LISTEN FOR FOR ELEMENTS THAT NEED MASKING
	$(document).off('keyup.inputMasker blur.inputMasker focus.inputMaske').on('keyup.inputMasker blur.inputMasker focus.inputMaske', '.mask-input', function(e){
		e.stopPropagation();
	    if($(this).attr('data-masktype') == 'ssn') imask(this, mssn);
	    if($(this).attr('data-masktype') == 'phone') imask(this, mphone);
	    if($(this).attr('data-masktype') == 'date') imask(this, mdate);
	 });

	//MASK A FIELD VALUE
	function imask(o, f) {
	   
		//var start = o.selectionStart,
	    //end = o.selectionEnd;
	    var v = f(o.value);

	    if (v != o.value) {
	    	var endLen = v.length;
	        o.value = v;
	        o.selectionStart = endLen;
	        o.selectionEnd = endLen;
	    }
	    
	}

	//MASK DATE
	function mdate(v) {
	    var r = v.replace(/\D/g,"");
	    if (r.length > 4) {
	        r = r.replace(/^(\d\d)(\d{2})(\d{0,4}).*/,"$1/$2/$3");
	    }
	    else if (r.length > 2) {
	        r = r.replace(/^(\d\d)(\d{0,2})/,"$1/$2");
	    }
	    else if (r.length > 0){
	        if (r > 12) {
	            r = "";
	        }
	    }
	    return r;
	}

	//MASK PHONE NUMBER
	function mphone(v) {
	    var r = v.replace(/\D/g,"");
	    r = r.replace(/^0/,"").trim();

	    if (r.length > 9) {
	        r = r.replace(/^(\d\d\d)(\d{3})(\d{0,4}).*/,"($1) $2-$3");
	    }
	    else if (r.length > 6) {
	        r = r.replace(/^(\d\d\d)(\d{3})(\d{0,4}).*/,"($1) $2-$3");
	    }
	    else if (r.length > 3) {
	        r = r.replace(/^(\d\d\d)(\d{0,3})/,"($1) $2");
	    }

	    else {
	        r = r.replace(/^(\d*)/, "$1");
	    }
	    return r;
	}

	//MASK SOCIAL SECURITY NUMBER
	function mssn(v) {
	    var r = v.replace(/\D/g,"");
	    if (r.length > 9) {
	        r = r.replace(/^(\d\d\d)(\d{2})(\d{0,4}).*/,"$1-$2-$3");
	        return r;
	    }
	    else if (r.length > 4) {
	        r = r.replace(/^(\d\d\d)(\d{2})(\d{0,4}).*/,"$1-$2-$3");
	    }
	    else if (r.length > 2) {
	        r = r.replace(/^(\d\d\d)(\d{0,3})/,"$1-$2");
	    }
	    else {
	        r = r.replace(/^(\d*)/, "$1");
	    }
	    return r;
	}

	// TOGGLE SHOW/HIDE FOR ANY PASSWORD FIELD
	// USAGE: Set attrib data-field-name to password field id attr and add toggle-show-hide class
	$( ".toggle-show-hide" ).on( "click", function(e) {
	    e.preventDefault();

	    var field_name = '#'+$(this).data('field-name');

	    if($(field_name).attr('type') == 'password') {
	        $(field_name).replaceWith($(field_name).clone().attr('type', 'text'));
	    } else {
	        $(field_name).replaceWith($(field_name).clone().attr('type', 'password'));
	    }

	});
//--------------------------------------- END INPUT MASKING CUSTOM LISTENERS AND FUNCTIONS -------------------------//



//--------------------------------------- LOCAL STORAGE HELPER -------------------------//
/*
 * jQuery Storage API Plugin
 *
 * Copyright (c) 2013 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/jQuery-Storage-API
 *
 * Version: 1.9.1
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function t(){var t,r,i,o=this._type,n=arguments.length,s=window[o],a=arguments,l=a[0];if(1>n)throw new Error("Minimum 1 argument must be given");if(e.isArray(l)){r={};for(var f in l){t=l[f];try{r[t]=JSON.parse(s.getItem(t))}catch(c){r[t]=s.getItem(t)}}return r}if(1!=n){try{r=JSON.parse(s.getItem(l))}catch(c){throw new ReferenceError(l+" is not defined in this storage")}for(var f=1;n-1>f;f++)if(r=r[a[f]],void 0===r)throw new ReferenceError([].slice.call(a,1,f+1).join(".")+" is not defined in this storage");if(e.isArray(a[f])){i=r,r={};for(var h in a[f])r[a[f][h]]=i[a[f][h]];return r}return r[a[f]]}try{return JSON.parse(s.getItem(l))}catch(c){return s.getItem(l)}}function r(){var t,r,i=this._type,o=arguments.length,n=window[i],s=arguments,a=s[0],l=s[1],f={};if(1>o||!e.isPlainObject(a)&&2>o)throw new Error("Minimum 2 arguments must be given or first parameter must be an object");if(e.isPlainObject(a)){for(var c in a)t=a[c],e.isPlainObject(t)||this.alwaysUseJson?n.setItem(c,JSON.stringify(t)):n.setItem(c,t);return a}if(2==o)return"object"==typeof l||this.alwaysUseJson?n.setItem(a,JSON.stringify(l)):n.setItem(a,l),l;try{r=n.getItem(a),null!=r&&(f=JSON.parse(r))}catch(h){}r=f;for(var c=1;o-2>c;c++)t=s[c],r[t]&&e.isPlainObject(r[t])||(r[t]={}),r=r[t];return r[s[c]]=s[c+1],n.setItem(a,JSON.stringify(f)),f}function i(){var t,r,i=this._type,o=arguments.length,n=window[i],s=arguments,a=s[0];if(1>o)throw new Error("Minimum 1 argument must be given");if(e.isArray(a)){for(var l in a)n.removeItem(a[l]);return!0}if(1==o)return n.removeItem(a),!0;try{t=r=JSON.parse(n.getItem(a))}catch(f){throw new ReferenceError(a+" is not defined in this storage")}for(var l=1;o-1>l;l++)if(r=r[s[l]],void 0===r)throw new ReferenceError([].slice.call(s,1,l).join(".")+" is not defined in this storage");if(e.isArray(s[l]))for(var c in s[l])delete r[s[l][c]];else delete r[s[l]];return n.setItem(a,JSON.stringify(t)),!0}function o(t){var r=a.call(this);for(var o in r)i.call(this,r[o]);if(t)for(var o in e.namespaceStorages)l(o)}function n(){var r=arguments.length,i=arguments,o=i[0];if(0==r)return 0==a.call(this).length;if(e.isArray(o)){for(var s=0;s<o.length;s++)if(!n.call(this,o[s]))return!1;return!0}try{var l=t.apply(this,arguments);e.isArray(i[r-1])||(l={totest:l});for(var s in l)if(!(e.isPlainObject(l[s])&&e.isEmptyObject(l[s])||e.isArray(l[s])&&!l[s].length)&&l[s])return!1;return!0}catch(f){return!0}}function s(){var r=arguments.length,i=arguments,o=i[0];if(1>r)throw new Error("Minimum 1 argument must be given");if(e.isArray(o)){for(var n=0;n<o.length;n++)if(!s.call(this,o[n]))return!1;return!0}try{var a=t.apply(this,arguments);e.isArray(i[r-1])||(a={totest:a});for(var n in a)if(void 0===a[n]||null===a[n])return!1;return!0}catch(l){return!1}}function a(){var e=this._type,r=arguments.length,i=window[e],o=arguments,n=[],s={};if(s=r>0?t.apply(this,o):i,s&&s._cookie)for(var a in Cookies.get())""!=a&&n.push(a.replace(s._prefix,""));else for(var l in s)s.hasOwnProperty(l)&&n.push(l);return n}function l(t){if(!t||"string"!=typeof t)throw new Error("First parameter must be a string");u?(window.localStorage.getItem(t)||window.localStorage.setItem(t,"{}"),window.sessionStorage.getItem(t)||window.sessionStorage.setItem(t,"{}")):(window.localCookieStorage.getItem(t)||window.localCookieStorage.setItem(t,"{}"),window.sessionCookieStorage.getItem(t)||window.sessionCookieStorage.setItem(t,"{}"));var r={localStorage:e.extend({},e.localStorage,{_ns:t}),sessionStorage:e.extend({},e.sessionStorage,{_ns:t})};return"object"==typeof Cookies&&(window.cookieStorage.getItem(t)||window.cookieStorage.setItem(t,"{}"),r.cookieStorage=e.extend({},e.cookieStorage,{_ns:t})),e.namespaceStorages[t]=r,r}function f(e){var t="jsapi";try{return window[e]?(window[e].setItem(t,t),window[e].removeItem(t),!0):!1}catch(r){return!1}}var c="ls_",h="ss_",u=f("localStorage"),g={_type:"",_ns:"",_callMethod:function(e,t){var r=[],t=Array.prototype.slice.call(t),i=t[0];return this._ns&&r.push(this._ns),"string"==typeof i&&-1!==i.indexOf(".")&&(t.shift(),[].unshift.apply(t,i.split("."))),[].push.apply(r,t),e.apply(this,r)},alwaysUseJson:!1,get:function(){return this._callMethod(t,arguments)},set:function(){var t=arguments.length,i=arguments,o=i[0];if(1>t||!e.isPlainObject(o)&&2>t)throw new Error("Minimum 2 arguments must be given or first parameter must be an object");if(e.isPlainObject(o)&&this._ns){for(var n in o)this._callMethod(r,[n,o[n]]);return o}var s=this._callMethod(r,i);return this._ns?s[o.split(".")[0]]:s},remove:function(){if(arguments.length<1)throw new Error("Minimum 1 argument must be given");return this._callMethod(i,arguments)},removeAll:function(e){return this._ns?(this._callMethod(r,[{}]),!0):this._callMethod(o,[e])},isEmpty:function(){return this._callMethod(n,arguments)},isSet:function(){if(arguments.length<1)throw new Error("Minimum 1 argument must be given");return this._callMethod(s,arguments)},keys:function(){return this._callMethod(a,arguments)}};if("object"==typeof Cookies){window.name||(window.name=Math.floor(1e8*Math.random()));var m={_cookie:!0,_prefix:"",_expires:null,_path:null,_domain:null,setItem:function(e,t){Cookies.set(this._prefix+e,t,{expires:this._expires,path:this._path,domain:this._domain})},getItem:function(e){return Cookies.get(this._prefix+e)},removeItem:function(e){return Cookies.remove(this._prefix+e,{path:this._path})},clear:function(){for(var t in Cookies.get())""!=t&&(!this._prefix&&-1===t.indexOf(c)&&-1===t.indexOf(h)||this._prefix&&0===t.indexOf(this._prefix))&&e.removeCookie(t)},setExpires:function(e){return this._expires=e,this},setPath:function(e){return this._path=e,this},setDomain:function(e){return this._domain=e,this},setConf:function(e){return e.path&&(this._path=e.path),e.domain&&(this._domain=e.domain),e.expires&&(this._expires=e.expires),this},setDefaultConf:function(){this._path=this._domain=this._expires=null}};u||(window.localCookieStorage=e.extend({},m,{_prefix:c,_expires:3650}),window.sessionCookieStorage=e.extend({},m,{_prefix:h+window.name+"_"})),window.cookieStorage=e.extend({},m),e.cookieStorage=e.extend({},g,{_type:"cookieStorage",setExpires:function(e){return window.cookieStorage.setExpires(e),this},setPath:function(e){return window.cookieStorage.setPath(e),this},setDomain:function(e){return window.cookieStorage.setDomain(e),this},setConf:function(e){return window.cookieStorage.setConf(e),this},setDefaultConf:function(){return window.cookieStorage.setDefaultConf(),this}})}e.initNamespaceStorage=function(e){return l(e)},u?(e.localStorage=e.extend({},g,{_type:"localStorage"}),e.sessionStorage=e.extend({},g,{_type:"sessionStorage"})):(e.localStorage=e.extend({},g,{_type:"localCookieStorage"}),e.sessionStorage=e.extend({},g,{_type:"sessionCookieStorage"})),e.namespaceStorages={},e.removeAllStorages=function(t){e.localStorage.removeAll(t),e.sessionStorage.removeAll(t),e.cookieStorage&&e.cookieStorage.removeAll(t),t||(e.namespaceStorages={})},e.alwaysUseJsonInStorage=function(t){g.alwaysUseJson=t,e.localStorage.alwaysUseJson=t,e.sessionStorage.alwaysUseJson=t,e.cookieStorage&&(e.cookieStorage.alwaysUseJson=t)}});

//--------------------------------------- END LOCAL STORAGE HELPER -------------------------//


//--------------------------------------- MEMORIZE BOOTSTRAP COLLAPSE STATE -------------------------//
$(function(){

	var collapseStorage  = $.localStorage;
	$(document).off('hidden.bs.collapse.SaveState').on('hidden.bs.collapse.SaveState', '.collapse[data-save-state="true"]', function(e){
		e.stopPropagation();
		collapseStorage.set('collapse-open_'+this.id, false);
		collapseStorage.set('collapse-close_'+this.id, true);
	});
	$('.collapse').off('shown.bs.collapse.SaveState').on('shown.bs.collapse.SaveState', '.collapse[data-save-state="true"]', function (e) {
		collapseStorage.set('collapse-open_' + this.id, true);
		collapseStorage.remove('collapse-close_' + this.id, false);
	});
	$('.collapse[data-save-state="true"]').each(function(){
		if(collapseStorage.get('collapse-open_' + this.id) == true) { try{ $(this).collapse('show'); } catch{} }
		else if(collapseStorage.get('collapse-close_' + this.id) == true) { try{ $(this).collapse('hide'); } catch{} }
		else{ try{ $(this).collapse('show'); } catch{} }
	});
});

//--------------------------------------- END BOOTSTRAP COLLAPSE STATE -------------------------//
