'use client';

import { withProps } from '@udecode/cn';
import { usePlateEditor, Plate, ParagraphPlugin, PlateLeaf } from '@udecode/plate/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  BoldPlugin,
  ItalicPlugin, 
  UnderlinePlugin, 
  StrikethroughPlugin, 
  CodePlugin, 
  SubscriptPlugin, 
  SuperscriptPlugin
} from '@udecode/plate-basic-marks/react';
// Import the comments plugin
import { CommentsPlugin } from '@udecode/plate-comments/react';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Create a simple CommentLeaf component (or import from @/components/plate-ui/comment-leaf if you have it)
const CommentLeaf = ({ attributes, children, nodeProps }: { attributes: any, children: any, nodeProps: any }) => {
  return (
    <span
      {...attributes}
      className="bg-yellow-100 dark:bg-yellow-800/30 text-black dark:text-white px-0.5 rounded"
    >
      {children}
    </span>
  );
};

export default function Page() {
  // Define editor with just the plugins you imported
  const editor = usePlateEditor({
    plugins: [
      // Core functionality
      ParagraphPlugin,
      BlockquotePlugin,
      
      // Text formatting
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
      SubscriptPlugin,
      SuperscriptPlugin,
      
      // Add Comments plugin
      CommentsPlugin.configure({
        // Optional: configure comments behavior
        options: {
          hotkey: ['mod+shift+m'], // Shortcut to add comments
        },
      }),
    ],
    // Map plugins to components
    components: {
      [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
      [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
      [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
      [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
      [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
      [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
      // Add comment leaf mapping
      [CommentsPlugin.key]: CommentLeaf,
    },
    // Initial content with a comment example
    value: [
      {
        id: "1",
        type: "p",
        children: [
          { text: "Hello, this is a " },
          { 
            text: "commented", 
            comment: {
              id: 'comment-1',
              value: 'This is a comment!',
              author: 'User',
              date: new Date().toISOString(),
            } 
          },
          { text: " text in a simplified Plate editor!" }
        ],
      },
    ],
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
}