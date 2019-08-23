/**
 * Change alignment for certain blocks to full.
 *
 * In this example, we change the alignment for the core/image and core/gallery
 * blocks.
 */
function FullAlign(BlockListBlock) {
  return props => {
    const { block } = props;

    // Bail out if it’s not a block we want to target.
    if (['core/image', 'core/gallery'].indexOf(block.name) === -1) {
      return <BlockListBlock {...props} />;
    }

    return (
      <BlockListBlock {...props} wrapperProps={{ 'data-align': 'full' }} />
    );
  };
}

wp.hooks.addFilter(
  'editor.BlockListBlock',
  'theme/block-full-align',
  FullAlign
);
