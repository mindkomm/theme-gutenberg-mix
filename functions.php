<?php

add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script(
		'theme-editor-scripts',
		get_theme_file_uri( 'build/editor.js' ),
		[
			'wp-blocks',
			'wp-components',
			'wp-compose',
			'wp-editor',
			'wp-element',
			'wp-i18n',
		],
		filemtime( get_theme_file_path( 'build/editor.js' ) ),
		true
	);
} );
