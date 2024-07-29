//ITUL OPTIONS
let itulOptions = {	
	files: {
		uploadUrl: '/files/upload',
	},
	spinner: false,
	useRequireVisible: false,
	ajaxFormValidationReporting: false,
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
	$(':input').off('invalid.FormValidation.Failed').on('invalid.FormValidation.Failed', function(e){
		console.log(e);
		spinner('hide');
	});
});

//--------------------------------------- END SPINNER LISTENERS AND FUNCTIONS -------------------------//



//--------------------------------------- BEGIN MD5 HASHING FUNCTION -------------------------//
function MD5(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
//--------------------------------------- END MD5 HASHING FUNCTION -------------------------//

//--------------------------------------- BEGIN UNIQUE ID HASHING FUNCTION -------------------------//
function makeUniqueId(){ return Date.now().toString(36)+Math.random().toString(36).substring(2, 12).padStart(12, 0)}
//--------------------------------------- END UNIQUE ID HASHING FUNCTION -------------------------//

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

	//WAIT FOR PAGE TO BE READY
	$(function(){

		//CHECK IF VALIDATION REPORTING IS ENABLED
		if(typeof(itulOptions.ajaxFormValidationReporting) !== 'undefined' && itulOptions.ajaxFormValidationReporting == true){

			//LISTEN FOR MOUSEOVER			
			$(document).off('mouseenter.AjaxForm.Validation.Init').on('mouseenter.AjaxForm.Validation.Init', 'form.ajax-form:not(.needs-validation-reporting)', function(e){
				if(typeof($(this).attr('novalidate')) == 'undefined'){
					$(this).attr('novalidate', 'novalidate');
					$(this).addClass('needs-validation-reporting');
					$(this).addClass('needs-validation');
				}
			});

			//LISTEN FOR FOCUS
			$(document).off('focus.AjaxForm.Validation.Field.Init').on('focus.AjaxForm.Validation.Field.Init', 'form.ajax-form:not(.needs-validation-reporting) :input', function(e){
				var form = $(this).closest('form');
				if(typeof($(form).attr('novalidate')) == 'undefined'){
					$(form).attr('novalidate', 'novalidate');
					$(form).addClass('needs-validation-reporting');
					$(form).addClass('needs-validation');
				}
			})

			//LISTEN FOR SUBMIT
			$(document).off('submit.AjaxForm.Validation.Run').on('submit.AjaxForm.Validation.Run', 'form.ajax-form.needs-validation-reporting:not(.validation-reporting-passed)', function(e){
				
				//PREVENT BUBBLING
				e.preventDefault();
				e.stopPropagation();

				//PASSED HTML VALIDATION
				if(this.checkValidity() === true){

					//SETUP CLASSES AND SUBMIT
					$(this).addClass('validation-reporting-passed');
					$(this).find(':input').removeClass('is-invalid').removeClass('is-valid');
					$(this).trigger('submit');
					$(this).removeClass('validation-reporting-passed');
				}

				//FAILED HTML VALIDATION
				else{

					//LOOP THROUGH THE INPUTS
					$(this).find(':input').each(function(k, v){

						//LISTEN FOR INVALID
						$(v).off('invalid.AjaxForm.Validation.Fail').on('invalid.AjaxForm.Validation.Fail', function(e){
							$(this).removeClass('is-valid').addClass('is-invalid');
						});

						//LISTEN FOR VALID
						$(v).off('valid.AjaxForm.Validation.Pass').on('valid.AjaxForm.Validation.Pass', function(e){
							$(this).addClass('is-valid').removeClass('is-invalid');
						});
					});

					//SHOW THE HTML VALIDATION ERRORS
					this.reportValidity();

					//HIDE THE SPINNER
					spinner('hide');
				}
			});
		}
	});
	

	//HANDLE AJAX FORM SUBMIT
	$(document).off('submit.ajaxForm').on('submit.ajaxForm', '.ajax-form', function(e){
		e.preventDefault();

		if(typeof(itulOptions.ajaxFormValidationReporting) !== 'undefined' && itulOptions.ajaxFormValidationReporting == true){
			if($(this).hasClass('needs-validation-reporting') && !$(this).hasClass('validation-reporting-passed')) return;
		}

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

	//--------------------------------------- BEGIN REQUIRE CONFIRM -------------------------//
	/*
        OPTIONS:
        data-redirect           : boolean   | default : true | TOGGLE REDIRECT TO href ATTRIBUTE (true) OR TRIGER THE ORIGINAL ELEMENT CLICK EVENT (false|default)
        data-confirm-msg        : string    | default : 'Are you sure you want to do this?' | THE MESSAGE THAT WILL DISPLAY IN THE MODAL
        data-confirm-btn-text   : string    | default : 'Yes' | THE TEXT OF THE MODAL CONFIRM BUTTON
        data-decline-btn-text   : string    | default : 'Cancel' | THE TEXT OF THE MODAL DECLINE BUTTON
        data-confirm-title      : string    | default : 'Please Confirm' | THE TEXT FOR THE MODAL TITLE
    */

    $(document).off('mouseenter.MouseOverRequireConfirm').on('mouseenter.MouseOverRequireConfirm', '.require-confirm', function(e){

        e.preventDefault();
        //e.stopImmediatePropagation();
        var width           = $(this).outerWidth();
        var height          = $(this).outerHeight();
        var offset          = $(this).offset();
        var newOffset       = $(this)[0].getBoundingClientRect();
        var that            = $(e.currentTarget);
        var redirect        = ($(this).data('redirect') == false || $(this).attr('data-redirect') == 'false') ? false : true;
        var overlay         = $('<div class="require-confirm-overlay"></div>').css({width: width+'px', height: height+'px', top: newOffset.top+'px', left:newOffset.left+'px',  position:'fixed', 'z-index': '9999999'});
        var conf_msg        = typeof($(this).attr('data-confirm-msg')) !== 'undefined' && $(this).attr('data-confirm-msg').length ? $(this).attr('data-confirm-msg') : 'Are you sure you want to do this?';
        var acceptBtnTxt    = typeof($(this).attr('data-confirm-btn-text')) !== 'undefined' ? $(this).attr('data-confirm-btn-text') : 'Yes';
        var declineBtnTxt   = typeof($(this).attr('data-decline-btn-text')) !== 'undefined' ? $(this).attr('data-decline-btn-text') : 'Cancel';
        var modalTitle      = typeof($(this).attr('data-confirm-title')) !== 'undefined' ? $(this).attr('data-confirm-title') : 'Please Confirm';

        $(overlay).data('trigger_element', that);
        $(this).data('confirm_overlay', $(overlay));
        $(overlay).data('conf_msg', conf_msg);
        $(overlay).data('require_confirm_config', {
            ele             : $(that),
            redirect        : redirect,
            body            : conf_msg,
            title           : modalTitle,
            declineBtn      : $('<button type="button" class="btn btn-link confirmation-dismiss-btn" data-bs-dismiss="modal">'+declineBtnTxt+'</button>'),
            confirmBtn      : $('<button type="button" class="btn btn-primary" data-bs-dismiss="modal">'+acceptBtnTxt+'</button>').data('confirmation_target', $(that)).data('redirect', redirect).click(function(e){
                var that = $(this).data('confirmation_target');
                $(that).data('confirmed', 'true');
                $(that).attr('data-confirmed', 'true');
                if($(this).data('redirect') == true){
                    window.location.href = $(that).attr('href');
                }
                else{
                    $(that).trigger('click');
                    $('.modal').modal('hide');
                }
            })
        });

        $(overlay).click(function(e){
            e.preventDefault();
            e.stopPropagation();

            if(typeof($(that).attr('id')) == 'undefined') $(that).attr('id', 'confirmable-'+Date.now());

            var dismissButton   = $('<button type="button" class="btn btn-link confirmation-dismiss-btn" data-bs-dismiss="modal">'+$(this).data('require_confirm_config').declineBtnTxt+'</button>');
            var confirmBtn      = $('<button type="button" class="btn btn-primary" data-bs-dismiss="modal">'+$(this).data('require_confirm_config').acceptBtnTxt+'</button>').data('confirmation_target', that).data('redirect', redirect);

            $(confirmBtn).click(function(){
                var that = $(this).data('confirmation_target');
                $(that).data('confirmed', 'true');
                $(that).attr('data-confirmed', 'true');
                //$(that).click();
                if($(this).data('redirect') == true){
                    window.location.href = $(that).attr('href');
                }
                else{
                    $(that).trigger('click');
                    $('.modal').modal('hide');
                }
            });

            var m = $(
                '<div class="modal fade" id="ajax-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">'+
                    '<div class="modal-dialog modal-dialog-centered" role="document">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">' +
                                '<h5 class="modal-title d-inline-block">'+$(this).data('require_confirm_config').title+'</h5>'+
                            '</div>'+
                            '<div class="modal-body">'+
                                $(this).data('require_confirm_config').body+
                            '</div>'+
                            '<div class="modal-footer">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );

            $(m).find('.modal-footer').append($(this).data('require_confirm_config').declineBtn);
            $(m).find('.modal-footer').append($(this).data('require_confirm_config').confirmBtn);
            $('body').append($(m));
            $(m).modal('show');
        });
        $(this).prepend($(overlay));
        return;
    });

    $(document).off('mouseleave.MouseOutRequireConfirm').on('mouseleave.MouseOutRequireConfirm', '.require-confirm', function(e){
        $(this).find('.require-confirm-overlay').remove();
    });

    //--------------------------------------- END REQUIRE CONFIRM -------------------------//


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
		$(this).trigger('it.sdz.DragOver');
		$(this).addClass('dragging-over');
	});

	$(document).off('dragleave.dragLeaveFile.DragAndDropFileUpload').on('dragleave.dragLeaveFile.DragAndDropFileUpload', '.drag-and-drop-file-upload', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).trigger('it.sdz.DragLeave');
		$(this).removeClass('dragging-over');
	});

	$(document).off('drop.dropFile.DragAndDropFileUpload').on('drop.dropFile.DragAndDropFileUpload', '.drag-and-drop-file-upload', function(event) {

		event.preventDefault();
		event.stopPropagation();
		$(this).trigger('it.sdz.dropping');
		$(this).removeClass('dragging-over');

		var callbackName    = typeof($(this).attr('data-callback')) !== 'undefined' ? $(this).attr('data-callback') : null;
		var multiFile       = typeof($(this).attr('data-multifile')) !== 'undefined' && $(this).attr('data-multifile') == 'true' ? true  : false;
		var displayProgress = typeof($(this).attr('data-display-progress') !== 'undefined') && $(this).attr('data-display-progress') != 'false' ? true : false;
		
		if(displayProgress){
			var inlineElement 			= ($(this).attr('data-display-progress') == 'true' || $(this).attr('data-display-progress') == 'modal') ? null : $($(this).attr('data-display-progress'));
			var onFinishHideProgress 	= typeof($(this).attr('data-hide-progress-on-finish')) !== 'undefined' && $(this).attr('data-hide-progress-on-finish') == 'false' ? false : true;
		}

		if(displayProgress){
			renderFileUploadProgressSynchronous(event, {
				callback 		: callbackName,
				multiFile 		: multiFile,
				asModal 		: inlineElement != null ? false : true,
				inlineElement 	: inlineElement,
				onFinishHide 	: onFinishHideProgress
			});
		}
		else{
			var ele = $(this);

			ajax_file_upload(event, $(this).data(), function(data){
				if(typeof(window[callbackName]) == 'function'){
					window[callbackName](data, ele);
				}
				else{
					spinner('hide');
				}
			}, event.originalEvent.dataTransfer.files);
		}

	});

	class SlickDropZone {

		id = null;
		options = {};
		element = null;

		constructor(id, options, element){
			this.id = id;
			this.options = options;
			this.element = element;
		}

		show(){
			$(this.options.wrapper).show();
			this.options.hide = false;
			return this;
		}

		hide(){
			$(this.options.wrapper).hide();
			this.options.hide = true;
			return this;
		}
	}

	var slickDropzoneInstances = {};

	//SLICK DROPZONE FILE UPLOADS
	$.fn.extend({

		/*
			//OPTIONS
			multiple: (bool), DEFAULT(false), ALLOW MULTI FILE UPLOADS
			onSuccess: (function) DEFAULT(null), A FUNCTION TO BE CALLED WHEN UPLOADS FINISHED
			accept: (null|string) DEFAULT(null), A COMMA DELIMITED LIST OF ACCEPTABLE MIME TYPES. WILDCARD MIME TYPES ARE ALLOWED LIKE image/* OR audio/* ETC. MULTIPLE TYPES CAN BE SET BY LISTING WITH COMMAS. (image/*,audio/*,video/*)
			hide: (bool) DEFAULT(false), TOGGLE FOR DISPLAYING THE UPLOAD WRAPPER AUTOMATICALLY WHEN INITIALIZED. A false VALUE WILL INITIALIZE THE WRAPPER BUT HIDE IT.
			displayProgress: {
				enabled: (bool|string|jquery Object), DEFAULT(true), IF SET TO "inline" THEN THE UPLOAD PROGRESS WILL DISPLAY INLINE INSTEAD OF IN A MODAL, IF SET TO A JQUERY OBJECT OR A SELECTOR THE PROGRESS WILL RENDER IN THAT ELEMENT
				onFinishHide: (bool), DEFAULT(true), IF FALSE THEN THE PROGRESS BARS WILL NOT DISAPPEAR WHEN FINISHED
			}

			//EXAMPLE 
			$('#dropzone-example').slickDropzone({
				displayProgress: {
					enabled 		: 'inline',
					onFinishHide 	: true,
				},
				onSuccess: function(e, data){
					if(typeof(data.files) != 'undefined' && data.files.length > 0){
						for(var x in data.files){
							var file = data.files[x];
							//...do something with the file here
						}
					}
				}
			});
		*/

		slickDropzone: function(settings){

			var defaultOptions = {
				multiple 			: false,
				onSuccess 			: null,
				accept 				: null,
				hide 				: false,
				displayProgress 	: {
					enabled 		: true,
					onFinishHide 	: true,
				},
			};

			if(typeof($(this).attr('slick-dropzone-id')) == 'undefined'){
				var slickDropzoneInstanceId = makeUniqueId();
				var slickDropzoneInstance = new SlickDropZone(slickDropzoneInstanceId, {}, $(this));
				slickDropzoneInstances[slickDropzoneInstanceId] = slickDropzoneInstance;
			}
			else{
				var slickDropzoneInstanceId = $(this).attr('slick-dropzone-id');
				var slickDropzoneInstance = slickDropzoneInstances[slickDropzoneInstanceId];
				var defaultOptions = slickDropzoneInstance.options;
			}

			if(settings == 'hide'){
				slickDropzoneInstance.hide();
				return $(this);
			}
			else if(settings == 'show'){
				slickDropzoneInstance.show();
				return $(this);
			}
			else if(settings == 'instance'){
				return slickDropzoneInstance;
			}

			var options = $.extend(defaultOptions, settings);

			slickDropzoneInstance.options = options;

			var that = this;
			$(this).addClass('slick-dropzone-source')

			if(typeof(options.displayProgress.onFinishHide) == 'undefined') options.displayProgress.onFinishHide = true;
			if(typeof(options.displayProgress.enabled) == 'undefined') options.displayProgress.enabled = true;

			$(this).trigger('it.sdz.initializing', [{options: options}]);			

			var inlineElement 		= null;
			var functionName 		= 'slick_dropzone_callback_'+makeUniqueId();
			window[functionName] 	= function(data, ele){ $(ele).trigger('it.sdz.success', [data]);};

			if(options.displayProgress.enabled == 'inline'){
				inlineElement 					= $('<div id="slick-dropzone-progress-wrapper-'+makeUniqueId()+'"></div>');
				options.displayProgress.enabled = '#'+$(inlineElement).attr('id');				
			}

			var icon 			= $('<div class="mb-3"><i class="fas fa-file-upload" style="font-size:32px;"></i></div>');
			var textWrapper 	= $('<p style="color:#717170" class="my-2">Drag & drop'+(options.multiple ? ' ' : ' a ')+'file'+(options.multiple ? 's' : '')+' here or<br></p>');
			var inputName 		= options.multiple ? 'file[]' : 'file';
			var label 			= $('<label class="btn btn-link text-decoration-none">Browse files</label>');			
			var inputElement 	= $('<input type="file"'+(options.multiple ? ' multiple ' : ' ')+'name="'+inputName+'" '+(options.accept != null ? 'accept="'+options.accept+'"' : '')+' class="ajax_file_upload d-none" data-callback="'+functionName+'">');
			var wrapper 		= $('<div class="text-center drag-and-drop-file-upload border" data-multifile="'+(options.multiple ? 'true' : 'false')+'" data-display-progress="'+(options.displayProgress.enabled === true ? 'true' : (options.displayProgress.enabled !== false ? options.displayProgress.enabled : 'false'))+'" data-hide-progress-on-finish="'+(options.displayProgress.onFinishHide ? 'true' : 'false')+'" data-callback="'+functionName+'"></div>');
			$(wrapper).hide();

			if(options.multiple) $(inputElement).attr('data-multifile', 'true');

			$(label).append($(inputElement));
			$(textWrapper).append($(label));
			$(textWrapper).prepend($(icon));
			$(wrapper).append($(textWrapper));
			if(inlineElement != null) $(wrapper).prepend($(inlineElement));

			options.inlineElement 	= inlineElement;
			options.callbackName 	= functionName;
			options.callback 		= window[functionName];
			options.wrapper 		= $(wrapper);

			$(this).attr('slick-dropzone-id', slickDropzoneInstanceId);			

			if(typeof(options.onSuccess) == 'function'){
				$(inputElement).on('it.sdz.success', options.onSuccess);
				$(wrapper).on('it.sdz.success', options.onSuccess);
			}

			$(this).append($(wrapper));
			
			setTimeout(function(){
				if(options.hide){
					slickDropzoneInstance.hide();
				}
				else{
					slickDropzoneInstance.show();
				}
				$(that).trigger('it.sdz.initialized', [{options: options}]);
			}, 1);
			

			return $(this);
		}
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



	//--------------------------------------- BEGIN AJAX FILE UPLOAD PROGRESS -------------------------//
	function renderFileUploadProgressSynchronous(event, options){

		var options = $.extend({
			callback 		: null,
			multiFile 		: false,
			asModal 		: true,
			inlineElement 	: null,
			onFinishHide 	: true,
		}, options);

		var inlineElement = null;

		if(options.inlineElement != null){
			inlineElement 	= $(options.inlineElement);
			options.asModal = false;
		}

		var callback 	= options.callback;
		var multiFile 	= options.multiFile;

	    //INIT DEFAULTS
	    var modal;
	    var parts;
	    var totalParts          = 0;
	    var currentPartPercent  = 0;
	    var callingElement      = $(event.currentTarget);	    

	     //TRY TO FIND THE FILE OBJECTS
	    try{
	        var files = event.originalEvent.dataTransfer.files;
	    }

	    //NO FILES WERE FOUND SO DELETE THE files OBJECT
	    catch{
	        if(typeof(files) !== 'undefined') delete files;
	    }

	    //REMOVE OLD FORM WRAPPERS
	    if($('.file-upload-progress-wrapper').length) $('.file-upload-progress-wrapper').remove();

	    var uploadUrl = typeof($(callingElement).attr('data-uploadurl')) == 'undefined' ? itulOptions.files.uploadUrl : $(callingElement).attr('data-uploadurl');

	    //BUILD THE FORM WRAPPER
	    var form_wrapper = $(
	        '<div class="file-upload-progress-wrapper">'+
	            '<form style="display:none" action="'+uploadUrl+'" method="post" enctype="multipart/form-data">'+
	                '<input type="file" name="'+(multiFile ? 'file[]' : 'file')+'" '+(multiFile ? 'multiple' : '')+'>'+
	            '</form>'+
	        '</div>'
	    );

	    //DEFINE THE FORM
	    var form = $(form_wrapper).find('form');   

	    //NO FILES WERE DEFINED BY THE EVENT
	    if(typeof(files) == 'undefined'){
	        $(form).find('input[type="file"]').trigger('click');
	    }

	    //FILES WERE DEFINED BY THE EVENT
	    else{

	        //SET THE FILES ON THE FORM FROM THE EVENT
	        $(form).find('input[type="file"]').prop('files', files);

	        //console.log(files);

	        //WAIT 1 MILLISECOND BEFORE TRIGGERING THE CHANGE EVENT (OTHERWRISE JAVASCRIPT WORKS TOO FAST)
	        setTimeout(function(){ $(form).find('input[type="file"]').trigger('change'); }, 1);
	    }

	    //LISTEN FOR THE FILE INPUT TO CHANGE
	    $(form).find('input[type="file"]').on('change', function(){

	        //INITIALIZE THE PARTS ARRAY
	        parts = [];

	        //GENERATE A MODAL
	        //modal = generate_modal({content: '', title: 'Uploading Files', dismissable: false});
	        if(options.asModal){
	        	modal = generateBootstrapModal({bodyContent: '<div class="container-fluid"></div>', title: 'Uploading Files', dismissable: false});
	        	inlineElement = $(modal).find('.modal-body > .container-fluid');
	        }

	        //LOOP THROUGH THE FILES
	        for(var x = 0; x < $(this)[0].files.length; x++){

	            //GET THE FILES
	            var file    = $(this)[0].files[x];	            

	            //BUILD THE ELEMENTS
	            var w = $('<div class="upload-wrapper"></div>');
	            var m = $('<div class="file-folder-helper-upload-message">'+file.name+'</div>');
	            var p = $('<div class="progress"></div>');
	            
	            var b = $('<div class="progress-bar progress-bar-striped progress-bar-animated active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>')
	                .on('finished.UploadProgress', function(e){
	                    var that = $(this);
	                    setTimeout(function(){ $(that).addClass('progress-bar-success').removeClass('active') }, 600);
	                })
	                .on('triggerSpinner.UploadProgress', function(e){
	                    var that = $(this);
	                    setTimeout(function(){ spinner() }, 500);
	                });

	            //ADD THE PART
	            parts.push({
	                wrap        : w,
	                message     : m,
	                progress    : p,
	                bar         : b,
	                size        : file.size,
	                file        : file,
	                name 		: file.name
	            });

	            //INCREMENT THE TOTAL PARTS BY THE FILE SIZE
	            totalParts += file.size;

	            //BUILD THE DISPLAY ELEMENTS
	            $(p).append(b);
	           
	            $(w).append(m);
	            $(w).append(p);

	            //APPEND THE ELEMENTS TO THE MODAL
	            //$(modal).find('.modal-body > .container-fluid').append(w);
	            $(inlineElement).append(w);

	            //HIDE THE SPINNER
	            spinner('hide');
	        }

	        var results = {files: [], error: []};
	        var calls = [];
	        var current = 0;
	        var uploaded = 0;

	        var doUploadProgressAjax = function(){

	            if(current < parts.length){

	            	if(current === 0){
	            		$(callingElement).trigger('it.uploadProgress.starting', [{
	            			uploaded: 0,
	            			total: parts.length,
	            		}]);       
	            	}

	                var part = parts[current];
	                
	                //ADD THE FILES
	                var uploadFormData = new FormData();
	                uploadFormData.append(0, part.file);    

	                $(callingElement).trigger('it.uploadProgress.file.starting', [{
            			uploaded: results.files.length,
            			file: {
            				name 		: part.name,
            				size 		: part.size,
            				progress  	: part.progress,
            			},
            			total: parts.length,
            		}]);      

	                //SEND IT OFF
	                $.ajax({
	                    xhr: function() {
	                        var xhr = new window.XMLHttpRequest();
	                        xhr.upload.addEventListener("progress", function(evt) {
	                            if (evt.lengthComputable) {
	                                var percentComplete = (evt.loaded / evt.total) * 100;
	                                //Do something with upload progress here
	                                $(part.bar).width(percentComplete+'%');
	                                $(part.bar).html(percentComplete+'%');
	                            }
	                       }, false);
	                       return xhr;
	                    },
	                    url         : uploadUrl,
	                    type        : 'POST',
	                    data        : uploadFormData,
	                    cache       : false,
	                    dataType    : 'json',
	                    processData : false,
	                    contentType : false,
	                    complete: function(xhr){
	                        try{
	                            var xhrRes = $.parseJSON(xhr.responseText);
	                            if(xhrRes.files.length){
	                            	for(var x in xhrRes.files) results.files.push(xhrRes.files[x]);
	                            }
	                            if(xhrRes.error.length){
	                            	for(var x in xhrRes.error) results.error.push(xhrRes.error[x]);
	                            }
	                        }
	                        catch{
	                            results.error.push(xhr);
	                        }

	                        $(callingElement).trigger('it.uploadProgress.file.finished', [{
		            			uploaded 		: results.files.length,
		            			file 			: {
		            				name 		: part.name,
		            				size 		: part.size,
		            				progress  	: part.progress,
		            			},
		            			total: parts.length,
		            		}]);     

	                        //results.push(res);

	                        current++;
	                        doUploadProgressAjax();
	                    }
	                });
	            }
	            else{
	                
	                var res = results;	      

	                $(callingElement).trigger('it.uploadProgress.finished', [{
	                	uploaded 	: results.files.length,
            			total 		: parts.length,
            			results 	: results
	                }]);       

	                if(typeof(window[callback]) == 'function'){
	                    window[callback](results, $(callingElement));
	                }
	                else if(typeof(callback) == 'function'){
	                    callback(results, $(callingElement));
	                }
	                //HANDLE HIDE ON FINISH            
	                spinner('hide');
	                if(options.onFinishHide){
                		if(options.asModal) $(modal).modal('hide');
                		else if(inlineElement != null) $(inlineElement).empty();
	                }
	            }
	        }

	        //CALL THE MODAL IF NEEDED
	        if(options.asModal) $(modal).on('shown.bs.modal', function(){  doUploadProgressAjax(); });

	        //NOT IN A MODAL SO JUST RUN THE AJAX
	        else doUploadProgressAjax();     
	    });
	}

	//--------------------------------------- END AJAX FILE UPLOAD PROGRESS -------------------------//


	//--------------------------------------- BEGIN AJAX SIDEBAR LISTENING AND FUNCTIONS -------------------------//

	$(document).off('click.itul.sidePanel.close').on('click.itul.sidePanel.close', '[data-itul-dismiss="sidepanel"]', function(e){
	    e.preventDefault();
	    e.stopPropagation();
	
	    var target = $(this).closest('.itul-sidepanel');
	    $(target).trigger('itul.sidepanel.hiding');
	    $(target).removeClass('panel-open');
	    var that = this; 
	    setTimeout(function(){ 
	        $(target).trigger('itul.sidepanel.hidden');
	        var sidePanelWrap = $(target).closest('.itul-sidepanel');
	        try{
	            $(sidePanelWrap).data('sidepanel_overlay').remove();
	        }
	        catch{
	
	        }
	        $(sidePanelWrap).remove();
	        //$(target).closest('.itul-sidepanel').remove(); 
	    }, 500);
	});
	
	//LISTEN FOR AJAX SIDEPANEL REQUEST
	var sidePanelTrigger;
	$(document).off('click.itul.sidePanel.trigger').on('click.itul.sidePanel.trigger', 'a.show-side-panel', function(e){
	
	    //PREVENT OTHER EVENTS 
	    e.preventDefault();
	    e.stopPropagation();
	    spinner();

		//APPEND THE STYLES
    	if(!$('style#itul-sidepanel-styles').length) $('head').append('<style id="itul-sidepanel-styles">.itul-sidepanel-overlay { top:0; left:0; right:0; bottom:0; position: fixed; background-color: #00000096;} .itul-sidepanel { background: #fff; border-left:1px solid #E6F0F9; overflow-y: auto; right:-680px; width:680px; position: fixed; top:0; bottom:0; transition: all .5s; z-index: 1000; box-shadow: 0 0 10px rgba(0,0,0,0.18); } .itul-sidepanel.itul-sidepanel-sm { right:-370px; width:370px; } .itul-sidepanel.itul-sidepanel-md { right:-680px; width:680px; } .itul-sidepanel.itul-sidepanel-lg { right:-860px; width:860px; } .itul-sidepanel.itul-sidepanel-xl { right:-1200px; width:1200px; } .itul-sidepanel.panel-open { right:0px; } .itul-sidepanel .side-panel-header-wrap { border-bottom:1px solid #E6F0F9;} .itul-sidepanel .side-panel-header-wrap, .itul-sidepanel .side-panel-body-wrap { padding:15px 30px;} .itul-sidepanel .side-panel-body-wrap hr.side-panel-divider { opacity: 1; margin-left: -30px; margin-right: -30px; margin-top: 1.5rem !important; margin-bottom: 1.5rem !important;}</style>');

		//MEMORIZE THE TRIGGERING ELEMENT
	    sidePanelTrigger = $(this);
	    var tmpSidePanelTrigger = $(this);
	
	    //REMOVE EXISTING SIDEPANEL
	    $('.itul-sidepanel').remove();
	    $('.itul-sidepanel-overlay').remove();
	
	    //DEFINE VARIABLES
	    var url           = $(this).attr('href');
	    var data          = $(this).data();
	    var type          = typeof($(this).attr('method')) !== 'undefined' ? $(this).attr('method') : 'get';
	    var ele           = $(this);
	    var callbackName  = typeof($(this).attr('callback')) ? $(this).attr('callback') : null;
	    var title         = typeof($(this).attr('title')) !== 'undefined' ? $(this).attr('title') : '';
	    var size          = typeof($(this).attr('data-itul-sidepanel-size')) !== 'undefined' ? $(this).attr('data-itul-sidepanel-size') : 'md';
	
	    //EXECUTE AJAX
	    $.ajax({
	        url     : url,
	        data    : data,
	        type    : type,
	        success : function(data){
	
	            data = typeof(data) == 'object' ? $(data.html) : $(data);
	
	            var sidePanelWrap = $('<div class="itul-sidepanel"></div>');    
	            $(sidePanelWrap).data('sidepanel_trigger', $(tmpSidePanelTrigger));
	            if(size.length) $(sidePanelWrap).addClass('itul-sidepanel-'+size);
	            $('body').append($(sidePanelWrap));
	            var header = $(
	                '<div class="side-panel-header-wrap">'+
	                    '<div class="row">'+
	                        '<div class="col side-panel-title-wrap"><h2>'+title+'</h2></div>'+
	                        '<div class="col-auto side-panel-close-btn-wrap"></div>'+
	                    '</div>'+
	                '</div>'
	            );
	
	            var dismissBtn = $('<a class="dismiss-side-panel-btn fw-bold" href="#" data-itul-dismiss="sidepanel">X</a>');
	
	            $(header).find('.side-panel-close-btn-wrap').append($(dismissBtn));
	            $(sidePanelWrap).append($(header));
	            var bodyWrap = $('<div class="side-panel-body-wrap"></div>');
	            $(bodyWrap).append($(data));
	            $(sidePanelWrap).append($(bodyWrap));
	            var sidePanelOverlay = $('<div class="itul-sidepanel-overlay"></div>').click(function(){
	                var forceCloseBtn = $('<a href="#" data-itul-dismiss="sidepanel" style="display:none"></a>');
	                $(this).next('.itul-sidepanel').append($(forceCloseBtn));
	                $(forceCloseBtn).trigger('click.itul.sidePanel.close');
	            });
	            $(sidePanelWrap).before($(sidePanelOverlay));
	            $(sidePanelWrap).data('sidepanel_overlay', $(sidePanelOverlay));
	            $(sidePanelWrap).trigger('itul.sidepanel.showing');
	            
	            //POPULATE THE SIDE PANEL HTML
	            setTimeout(function(){
	                $(sidePanelWrap).addClass('panel-open');
	                setTimeout(function(){
	                    $(sidePanelWrap).trigger('itul.sidepanel.shown');
	                }, 500);
	            }, 1);
	
	            //HANDLE NAMESPACED CALLBACK FUNCTION
	            if(callbackName !== null){
	                if(typeof(window[callbackName]) == 'function'){
	                    window[callbackName](data, ele)
	                }
	            }
	        }
	    }).done(function(){
	        spinner('hide');
	    });
	});

	//--------------------------------------- END AJAX SIDEBAR LISTENING AND FUNCTIONS -------------------------//



	//--------------------------------------- BEGIN AJAX MODAL LISTENING AND FUNCTIONS -------------------------//

	var modalTrigger;

	function generateBootstrapModal(options){

		var options = $.extend({
			bodyContent 	: '',
			dialogClass 	: '',
			contentClass  	: '',
			title 			: '',
			size  			: 'lg',
			dismissable 	: true,
			modalOptions 	: {
				backdrop 	: true,
				keyboard 	: false,
				show 		: true, 
			},	
		}, options);

		//FORCE MODAL OPTIONS WHEN DISMISSABLE
		options.modalOptions.backdrop = options.dismissable ? options.modalOptions.backdrop : 'static';
		options.modalOptions.keyboard = options.dismissable ? options.modalOptions.keyboard : false;

		//FORCE MODAL SIZE TO STANDARD FORMAT
		options.size = 'modal-'+(options.size.replace('modal-', ''));

		//DEFINE THE MODAL HEADER
		var modalHeader 	=
			'<div class="modal-header">' +
				'<h5 class="modal-title d-inline-block">' + options.title + '</h5>'+
				(options.dismissable ? '<button type="button" data-bs-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>' : '')+
			'</div>';

		//SET THE MODAL HEADER TO EMPTY IF NO TITLE AND NOT DISMISSABLE
		if(options.title == '' && !options.dismissable) modalHeader = '';

		var m = $(
			'<div class="modal fade" id="ajax-modal" tabindex="-1" role="dialog" aria-hidden="true">'+
				'<div class="modal-dialog '+options.dialogClass+' '+options.size+'" role="document">'+
					'<div class="modal-content' + options.contentClass + '">'+
						modalHeader+
						'<div class="modal-body">'+
							options.bodyContent+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

		//PLACE THE FOOTER CORRECTLY
		if($(m).find('.modal-body .modal-footer').length) $(m).find('.modal-body .modal-footer').appendTo($(m).find('.modal-content'));

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
		$(m).modal(options.modalOptions);
		if(options.modalOptions.show === true) $(m).modal('show');

		/*
		$(m).on('shown.bs.modal', function(){
			$(document).trigger('itul.livewire.rescan');
		});
		*/

		$(modalTrigger).trigger('it.modal.created', [$(m)]);

		return $(m);
	}

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

		/*		
		var modal_header =
			'<div class="modal-header">' +
				'<h5 class="modal-title d-inline-block">' + title + '</h5>'+
				dismissButton+
			'</div>';


		if(title == '' && !dismissable) modal_header = '';
		*/

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

				var m = generateBootstrapModal({
					bodyContent 	: data,
					dialogClass 	: addn_dialog_class,
					contentClass 	: addn_class,
					title 			: title,
					size 			: size,
					dismissable 	: dismissable,
					modalOptions 	: modal_options,
				});

				//var footer = $(data).find('.modal-footer').length;

				/*
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
				if($(m).find('.modal-body .modal-footer').length) $(m).find('.modal-body .modal-footer').appendTo($(m).find('.modal-content'));

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

				
				//$(m).on('shown.bs.modal', function(){
				//	$(document).trigger('itul.livewire.rescan');
				//});

				$(modalTrigger).trigger('it.modal.created', [$(m)]);
				*/
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


//--------------------------------------- REQUIRE VISIBLE -------------------------//

	/*
	$.RequireVisible = function(options){

		$.fn.extend({
			requireVisible: function(options){
				$(this).find('.require-visible').removeAttr('required');
				$(this).find('.require-visible:visible').attr('required', 'required')
			}
		});

		$('.require-visible').closest('form').requireVisible();
	};

	//WAIT FOR PAGE TO LOAD
	$(function(){

		//TRIGGER REQUIRE VISIBLE
		$.RequireVisible();
	});
	*/

	//WAIT FOR THE PAGE TO LOAD
	$(function(){

		try {
			iMaskWrap();
		} catch{
			//SILENT
		}

		//CHECK IF WE WANT TO LISTEN FOR USE REQUIRED
		if(typeof(itulOptions.useRequireVisible) != 'undefined' && itulOptions.useRequireVisible == true){

			//DEFINE THE MUTATION AND CALLBACK
			(new (window.MutationObserver || window.WebKitMutationObserver)(function(mutations, visibleObserver){

				//DEFINE THE TIME IF NEEDED
				if(typeof(window['requiredVisibleTimer']) == 'undefined') window['requiredVisibleTimer'] = null;
				
				//CLEAR THE EXISTING TIMER
			    clearTimeout(window['requiredVisibleTimer']);

			    //START A NEW TIMER
			    window['requiredVisibleTimer'] = setTimeout(function(){

					//CHECK IF THERE ARE FIELDS TO MODIFY
					if($(':input.require-visible').length){
						
						//DISCONNECT THE EXISTING OBSERVER
				    	visibleObserver.disconnect();
	
				    	//REMOVE REQUIRED FROM REQUIRE VISIBLE FIELDS
				    	$(':input.require-visible').not(':visible').removeAttr('required');
	
				    	//ADD REQUIRED TO VISIBLE REQUIRE VISIBLE FIELDS
				    	$(':input.require-visible:visible').attr('required', true);
	
				    	//START OBSERVING AGAIN
				    	visibleObserver.observe($('body')[0], {subtree: true, attributes: true, childList: true});
					}

			    //WAIT 500 MILLISECONDS BEFORE PROCESSING THE VISIBLE OBSERVER
			    }, 500);				

			})).observe($('body')[0], {subtree: true, attributes: true, childList: true});
		}

		//DEFINE THE MUTATION AND CALLBACK
		(new (window.MutationObserver || window.WebKitMutationObserver)(function(mutations, visibleObserver){

			//DEFINE THE TIME IF NEEDED
			if(typeof(window['iMaskTimer']) == 'undefined') window['iMaskTimer'] = null;
			
			//CLEAR THE EXISTING TIMER
		    clearTimeout(window['iMaskTimer']);

		    //START A NEW TIMER
		    window['iMaskTimer'] = setTimeout(function(){

				//CHECK IF THERE ARE FIELDS TO MODIFY
				if($(':input.mask-input').length){
					
					//DISCONNECT THE EXISTING OBSERVER
			    	visibleObserver.disconnect();

			    	try {
						iMaskWrap();
					} catch{
						//SILENT
					}
					

			    	//START OBSERVING AGAIN
			    	visibleObserver.observe($('body')[0], {subtree: true, attributes: true, childList: true});
				}

		    //WAIT 500 MILLISECONDS BEFORE PROCESSING THE VISIBLE OBSERVER
		    }, 500);				

		})).observe($('body')[0], {subtree: true, attributes: true, childList: true});
	});
//--------------------------------------- END REQUIRE VISIBLE -------------------------//


//--------------------------------------- INPUT MASKING CUSTOM LISTENERS AND FUNCTIONS -------------------------//

	/*
	*
	* INPUT MASKING USAGE
	*
	* To mask data on a text field just add the class "hover-unmask". This will convert the field into a password field and only display the value when hovering
	* To mask data into a format of either phone,date or social security number just add the class "input-mask" and the data-type="{type}". Repace type with one of the options (phone,date,ssn)
	*
	*/

	
	function luhnCCCheck(number) {
	  var digits = number.replace(/\D/g, '').split('').map(Number);
	  let sum = 0;
	  let isSecond = false;
	  for (let i = digits.length - 1; i >= 0; i--) {
	    let digit = digits[i];
	    if (isSecond) {
	      digit *= 2;
	      if (digit > 9) {
	        digit -= 9;
	      }
	    }
	    sum += digit;
	    isSecond = !isSecond;
	  }
	  return sum % 10 === 0;
	}
	

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

	//CURRENCY PARSER
	const instances=new Map,GUID=Symbol("GUID");class Currency{static data(t){return instances.has(t[GUID])&&instances.get(t[GUID])}static position(t){const e=new Set(["1","2","3","4","5","6","7","8","9","0",..."٠١٢٣٤٥٦٧٨٩",..."۰۱۲۳۴۵۶۷۸۹"]);let n=0;for(let i=t.length-1;i>=0&&!e.has(t[i]);i--)n++;return String(t).length-n}static#t(t,e=2){const n=String(t),i=/-/.test(n)?"-":"",s=n.replaceAll(/[٠١٢٣٤٥٦٧٨٩]/g,(t=>t.codePointAt(0)-1632)).replaceAll(/[۰۱۲۳۴۵۶۷۸۹]/g,(t=>t.codePointAt(0)-1776)).replaceAll(/\D/g,"").replaceAll(/^0+/g,""),r=s.padStart(e+1,"0");return{minus:i,d:r.slice(-1*e),i:r.slice(0,r.length-e)}}static unmasking(t,e){const{minus:n,d:i,i:s}=Currency.#t(t,e);return Number(`${n}${s}.${i}`)}static masking(t,e={}){const{digits:n=2,empty:i=!1,locales:s="pt-BR",options:r={minimumFractionDigits:n,maximumFractionDigits:n},viaInput:a=!1}=e,u=new Set(["ISK","JPY"]).has(r?.currency),c=Number(t);!1===Number.isNaN(c)&&!1===a&&!1===u&&(t=new Intl.NumberFormat("en-US",{minimumFractionDigits:n,maximumFractionDigits:n}).format(c));let{minus:o,d:l,i:p}=Currency.#t(t,n);if(i&&"0"===p&&["00","000"].includes(l)&&""===o)return"";let h=`${o}${p}.${l}`;if(u&&a){h=`${o}${String(t).replaceAll(/\D/g,"")||0}`}return new Intl.NumberFormat(s,r).format(h)}constructor(t,e={}){if(this.opts={keyEvent:"input",triggerOnBlur:!1,init:!1,backspace:!1,maskOpts:{},...e},this.opts.maskOpts.viaInput=!0,t instanceof globalThis.HTMLInputElement==!1)throw new TypeError("The input should be a HTMLInputElement");if(Currency.data(t)instanceof Currency)throw new TypeError("The input has already been instanced. Use the static method `Currency.data(input)` to get the instance.");this.events=new Set,this.input=t,this.opts.init&&(this.input.value=Currency.masking(this.input.value,{...this.opts.maskOpts,viaInput:!1})),this.input.addEventListener(this.opts.keyEvent,this),this.events.add(this.opts.keyEvent),this.input.addEventListener("click",this),this.events.add("click"),this.opts.triggerOnBlur&&(this.input.addEventListener("blur",this),this.events.add("blur")),this.input[GUID]=this.#e(),instances.set(this.input[GUID],this)}getUnmasked(){return Currency.unmasking(this.input.value)}#e(){return globalThis?.crypto?.randomUUID?globalThis.crypto.randomUUID().replaceAll("-",""):Number(Math.random()).toString(16).slice(2,8)+Date.now().toString(16)}onMasking(t){if(this.opts.backspace&&"deleteContentBackward"===t?.inputType)return;this.input.value=Currency.masking(this.input.value,this.opts.maskOpts);const e=Currency.position(this.input.value);this.input.setSelectionRange(e,e)}onClick(){const t=Currency.position(this.input.value);this.input.focus(),this.input.setSelectionRange(t,t)}destroy(){this.input.value=Currency.unmasking(this.input.value);for(const t of this.events)this.input.removeEventListener(t,this);instances.has(this.input[GUID])&&instances.delete(this.input[GUID])}handleEvent(t){"click"===t.type?this.onClick(t):this.onMasking(t)}};


	$(document).off('focus.it.mask.currency').on('focus.it.mask.currency', '.mask-input[data-masktype="currency"]', function(e){
		new Currency($(this)[0], {
			backspace: true,
			maskOpts: {locales: 'en-US', /*options: { style: 'currency', currency: 'USD'}*/}
		});
	});

	//LISTEN FOR FOR ELEMENTS THAT NEED MASKING
	
	$(document).off('keyup.inputMasker blur.inputMasker focus.inputMaske').on('keyup.inputMasker blur.inputMasker focus.inputMaske', '.mask-input', function(e){
		e.stopPropagation();
	    if($(this).attr('data-masktype') == 'ssn') imask(this, mssn);
	    if($(this).attr('data-masktype') == 'phone') imask(this, mphone);
	    if($(this).attr('data-masktype') == 'date') imask(this, mdate);
		if($(this).attr('data-masktype') == 'percent') imask(this, mpercent);
		if($(this).attr('data-masktype') == 'date-mmyyyy') imask(this, mdatemmyyyy);
		if($(this).attr('data-masktype') == 'credit'){
			//$(this).attr('data-valid-cc', luhnCCCheck($(this).val()));
			if(!luhnCCCheck($(this).val())){
				$(this)[0].setCustomValidity("Invalid Credit Card Number");
			}
			imask(this, mcreditcard);
		} 
		//if ($(this).attr('data-masktype') == 'currency') imask(this, mcurrency);
	});
	 

	function iMaskWrap(){
		$('.mask-input:not(.mask-input-initialized)').each(function(k, v){
			if($(v).attr('data-masktype') == 'ssn') imask(v, mssn);
		    if($(v).attr('data-masktype') == 'phone') imask(v, mphone);
		    if($(v).attr('data-masktype') == 'date') imask(v, mdate);
			if($(v).attr('data-masktype') == 'percent') imask(v, mpercent);
			if($(v).attr('data-masktype') == 'credit'){
				$(v).attr('data-valid-cc', luhnCCCheck($(v).val()));
				imask(v, mcreditcard);
			} 
			if($(v).attr('data-masktype') == 'date-mmyyyy'){
				$(v).attr('minlength', '7');
				$(v).attr('maxlength', '7');
				imask(v, mdatemmyyyy)
			} 
			if($(v).attr('data-masktype') == 'currency'){
				//$(v).val(Number($(v).val().replace(/[^\d.]/g, ''), '').toLocaleString('en-US'))
				$(v).val(number_format(Number($(v).val().replace(/[^\d.]/g, ''), '')))
				new Currency($(v)[0], {backspace: true, triggerOnBlur: true,  maskOpts: {locales: 'en-US', minimumSignificantDigits: 1, minimumFractionDigits: 2 /*options: { style: 'currency', currency: 'USD'}*/}});
			} 
			$(k).addClass('mask-input-initialized');
		});
	}

	function mcreditcard(v){
		var r = v.replace(/\D/g,"");
		if(r.length > 12){
			r = r.replace(/(\d{4})(\d{4})(\d{4})(\d{1,4})/, "$1-$2-$3-$4");
		}
		else if(r.length > 8){
			r = r.replace(/(\d{4})(\d{4})(\d{1,4})/, "$1-$2-$3");
		}
		else if(r.length > 4){
			r = r.replace(/(\d{4})(\d{1,4})/, "$1-$2");
		}
		else if(r.length){
			r = r.replace(/(\d{1,4})/, "$1");
		}
		return r;
	}

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

	function mdatemmyyyy(v){
		var r = v.replace(/\D/g,"");

		if(r.length > 2){
			r = r.replace(/^(\d{2})(\d{1,4}).*/,"$1/$2");
		}
		else{
			r = r.replace(/^(\d*)/, "$1");
		}
		return r;
	}

	// MASK PERCENTAGE (NUMBER SHOULD NOT BE GREATER THAN 100)
	function mpercent(v) {
		var r = v.replace(/\D/g, ""); // Remove non-numeric characters
		r = parseInt(r, 10); // Convert to integer
		if (isNaN(r)) {
			return ""; // Return empty string if not a number
		}
		// Ensure the number is not greater than 100
		r = Math.min(r, 100);
		return r.toString(); // Convert back to string
	}

	// MASK CURRENCY
	function mcurrency(v) {
		// Remove non-numeric characters and leading zeros
		v = v.replace(/[^\d.]/g, '').replace(/^0+(?=\d)/, '');
		// v = Number(v.replace(/[^\d.]/g, ''), '').toLocaleString();
		// return v;
		// Split the string into integer and decimal parts
		var parts = v.split('.');
		var integerPart = parts[0] || '';
		var decimalPart = parts[1] || '';
	
		// Add commas to the integer part
		integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	
		// Limit the decimal part to two digits
		decimalPart = decimalPart.slice(0, 2);
	
		// If the user typed a dot at the end, automatically add two zeros
		if (v.endsWith('.')) {
			decimalPart += '00';
		}
	
		// Combine integer and decimal parts with a period
		var result = integerPart + (decimalPart ? '.' + decimalPart : '');
	
		return result;
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



//--------------------------------------- DECIMAL INPUT FIELD -------------------------//

	function number_format (number, decimals = 2, dec_point = '.', thousands_sep = ',') {

	    // Strip all characters but numerical ones.
	    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	    var n = !isFinite(+number) ? 0 : +number,
	        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	        s = '',
	        toFixedFix = function (n, prec) {
	            var k = Math.pow(10, prec);
	            return '' + Math.round(n * k) / k;
	        };
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	    if (s[0].length > 3) {
	        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	    }
	    if ((s[1] || '').length < prec) {
	        s[1] = s[1] || '';
	        s[1] += new Array(prec - s[1].length + 1).join('0');
	    }
	    return s.join(dec);
	}

	var itulDecimalFieldKeyupTimer;

	$(document).off('keyup.itul.Field.Decimal.Keyup').on('keyup.itul.Field.Decimal.Keyup', ':input.number_format', function(){
		clearTimeout(itulDecimalFieldKeyupTimer);
		var that = $(this);
		itulDecimalFieldKeyupTimer = setTimeout(function(){
			$(that).val(number_format($(that).val()));
		}, 1000);
	});

	$(document).off('paste.itul.Field.Decimal.Paste').on('paste.itul.Field.Decimal.Paste', ':input.number_format', function(){
		$(this).val(number_format($(this).val()));
	});

	$(document).off('change.itul.Field.Decimal.Change').on('change.itul.Field.Decimal.Change', ':input.number_format', function(){
		$(this).val(number_format($(this).val()));
	});

	$(document).off('blur.itul.Field.Decimal.Blur').on('blur.itul.Field.Decimal.Blur', ':input.number_format', function(){
		$(this).val(number_format($(this).val()));
	});


//--------------------------------------- END DECIMAL INPUT FIELD -------------------------//



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

//LISTEN FOR MEMORIZED COLLAPSABLE ELEMENTS
$(document).off('memorized.collapse.show').on('memorized.collapse.show', function(){

	//SET THE STORAGE PREFIX
	var collapseStoragePrefix = 'collapseStorage.'+MD5(window.location.href);

	//INITIALIZE THE STORGAGE ELEMENT
	try{ $.localStorage.get(collapseStoragePrefix); } catch{ $.localStorage.set(collapseStoragePrefix, {}); }

	//LISTEN FOR HIDDEN
	$(document).off('hidden.bs.collapse.SaveState').on('hidden.bs.collapse.SaveState', '.collapse[data-save-state="true"]', function(e){
		e.stopPropagation();
		try{ $.localStorage.remove(collapseStoragePrefix+'.collapse-open.'+this.id); } catch{}		
		$.localStorage.set(collapseStoragePrefix+'.collapse-close.'+this.id, true);
	});

	//LISTEN FOR SHOWN
	$(document).off('shown.bs.collapse.SaveState').on('shown.bs.collapse.SaveState', '.collapse[data-save-state="true"]', function (e) {
		e.stopPropagation();
		try{ $.localStorage.remove(collapseStoragePrefix+'.collapse-close.' + this.id); } catch{}		
		$.localStorage.set(collapseStoragePrefix+'.collapse-open.' + this.id, true);
		
	});

	//TOGGLE OPEN AND CLOSED STATE OF COLLAPSE
	$('.collapse[data-save-state="true"]').each(function(){
		if($.localStorage.isSet(collapseStoragePrefix+'.collapse-open.' + this.id) && $.localStorage.get(collapseStoragePrefix+'.collapse-open.' + this.id) == true) { try{ $(this).collapse('show'); } catch{} }
		else if($.localStorage.isSet(collapseStoragePrefix+'.collapse-close.' + this.id) && $.localStorage.get(collapseStoragePrefix+'.collapse-close.' + this.id) == true) { try{ $(this).collapse('hide'); } catch{} }
		else{ try{ $(this).collapse('show'); } catch{} }
	});
});

//WAIT FOR JQUERY TO BE LOADED
$(function(){

	//TRIGGER MEMORIZED COLLAPSABLE ELEMENTS TO TOGLE OPEN
	$(document).trigger('memorized.collapse.show');	
});

//--------------------------------------- END BOOTSTRAP COLLAPSE STATE -------------------------//
