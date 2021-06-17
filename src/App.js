
import React, {userState, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import {Bold, Italic, Strikethrough, Underline, Code, Superscript, Subscript} from '@ckeditor/ckeditor5-basic-styles';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import {FontSize, FontColor, FontFamily, FontBackgroundColor} from '@ckeditor/ckeditor5-font';
import {Link} from '@ckeditor/ckeditor5-link';
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {Alignment} from '@ckeditor/ckeditor5-alignment';
import {Table} from '@ckeditor/ckeditor5-table';
import {List}  from '@ckeditor/ckeditor5-list';
import {Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload} from '@ckeditor/ckeditor5-image';
import {HorizontalLine} from '@ckeditor/ckeditor5-horizontal-line';
import {Undo} from '@ckeditor/ckeditor5-undo';
import {Model} from '@ckeditor/ckeditor5-ui';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {Indent, IndentBlock} from '@ckeditor/ckeditor5-indent';
import {MediaEmbed} from '@ckeditor/ckeditor5-media-embed';
import {Markdown} from '@ckeditor/ckeditor5-markdown-gfm';

const editorConfiguration = {
  plugins: [
    Essentials, Paragraph,
    Bold, Italic, Strikethrough, Underline, Code, Superscript, Subscript,
    FontSize, FontColor, FontFamily, FontBackgroundColor,
    Link, BlockQuote, Alignment,
    Table, List, Markdown,
    Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload,
    HorizontalLine, Heading, IndentBlock, MediaEmbed, Undo, Model, Heading, Indent, MediaEmbed
  ],
  toolbar: [
    'heading','bold', 'italic', 'strikethrough', 'underline', 'code', 'superscript', 'subscript', "|",
    'fontsize', 'fontcolor', 'fontfamily', 'fontbackgroundcolor', "|",
    'link', 'blockquote', 'horizontalLine', 'alignment', 'bulletedList', 'numberedList', "|",
    'imageUpload', 'mediaEmbed', 'insertTable', "|", 
    'undo', 'redo', 'indent', 'outdent'
  ],
  fontSize: {
    options: [
      9,10,11,12,13,14,15,16,17,18,19,20,25,30
    ],
  },
  alignment: {
    options: ["justify", "left", "center", "right"],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  image: {
    resizeUnit: "px",
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:full",
      "imageStyle:alignRight",
      "|",
      "imageTextAlternative",
    ],
    styles: ["full", "alignLeft", "alignRight"],
  },
  typing: {
    transformations: {
      remove: [
        "enDash",
        "emDash",
        "oneHalf",
        "oneThird",
        "twoThirds",
        "oneForth",
        "threeQuarters",
      ],
    },
  },
  placeholder: "글을 입력해보세요!",
  heading: {
    options: [
      {
        model: "paragraph",
        view: "p",
        title: "본문",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading1",
        view: "h1",
        title: "헤더1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "헤더2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "헤더3",
        class: "ck-heading_heading3",
      },
    ],
  },
};

function App() {
  const [text, setText] = useState('');

  return (
    <div>
     <h2>Using CKEditor 5 from source in React</h2>
      <CKEditor
          editor={ ClassicEditor }
          config={ editorConfiguration }
          data="<p>Hello from CKEditor 5!</p>"
          onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setText(data);
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
      />
      <div>{text}</div>
    </div>
  );
}

export default App;
