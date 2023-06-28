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
		var dismissButton 		= dismissable ? '<button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>' : '';


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
