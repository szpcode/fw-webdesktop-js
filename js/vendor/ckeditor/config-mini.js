CKEDITOR.editorConfig = function( config ) {
    config.skin = 'bootstrapck';
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'undo' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks' ] },
		{ name: 'colors', groups: [ 'colors' ] }
	];
  // config.toolbarStartupExpanded = false;
  // config.toolbarCanCollapse = true;
  // config.removePlugins = 'toolbar';
    config.removeButtons = 'Save,NewPage,Preview,Print,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,ImageButton,HiddenField,Button,Language,Smiley,ShowBlocks,Maximize,About,Templates,BidiRtl,BidiLtr,PasteText,PasteFromWord';
    config.contentsCss = 'js/vendor/ckeditor/contents.css' ;
}