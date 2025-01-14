import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';

import { FaBold } from 'react-icons/fa';
import { FaItalic } from 'react-icons/fa6';
import { FaUnderline } from 'react-icons/fa6';
import { VscListOrdered } from 'react-icons/vsc';
import { RiListUnordered } from 'react-icons/ri';
import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';
import { MdOutlineFormatClear } from 'react-icons/md';

const RichTextEditor = () => {
  const [content, setContent] = useState('');

  const quillRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({});

  // Custom Toolbar Options
  const modules = {
    toolbar: {
      container: '#toolbar', // Attach custom toolbar
    },
  };

  console.log(activeFormats);

  const handleTextInput = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log(content);
  };

  // Toggle formatting
  const toggleFormat = (format, value = true) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const currentFormat = quill.getFormat()[format]; // Check current format state

      if (format === 'list') {
        // Toggle between 'ordered', 'bullet', and undefined
        quill.format(format, currentFormat === value ? false : value);
      } else {
        const isActive = currentFormat; // For other formats, check if active
        quill.format(format, isActive ? false : value);
      }

      // Update active formats
      const updatedFormats = quill.getFormat();
      setActiveFormats(updatedFormats);
    }
  };

  // Update active states when selection changes
  const handleSelectionChange = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const formats = quill.getFormat();
      setActiveFormats(formats);
    }
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-md w-full max-w-2xl'>
      {/* Custom Toolbar */}
      <div
        id='toolbar'
        className='mb-2 flex gap-2 bg-gray-100 p-2 rounded border border-gray-300'
      >
        <button
          onClick={() => toggleFormat('bold')}
          className={`rounded px-2 py-1 ${
            activeFormats.bold ? 'bg-blue-300' : 'hover:bg-gray-300 bg-gray-200'
          }`}
          aria-label='Bold'
        >
          <FaBold />
        </button>
        <button
          onClick={() => toggleFormat('italic')}
          className={`rounded px-2 py-1 ${
            activeFormats.italic
              ? 'bg-blue-300'
              : 'hover:bg-gray-300 bg-gray-200 '
          }`}
          aria-label='Italic'
        >
          <FaItalic />
        </button>
        <button
          onClick={() => toggleFormat('underline')}
          className={`rounded px-2 py-1 ${
            activeFormats.underline
              ? 'bg-blue-300'
              : 'hover:bg-gray-300 bg-gray-200'
          }`}
          aria-label='Underline'
        >
          <FaUnderline className='text-lg' />
        </button>
        <button
          onClick={() => toggleFormat('list', 'ordered')}
          className={`rounded px-2 py-1 ${
            activeFormats.list === 'ordered'
              ? 'bg-blue-300'
              : 'hover:bg-gray-300 bg-gray-200'
          }`}
          aria-label='Ordered List'
        >
          <VscListOrdered className='text-2xl' />
        </button>
        <button
          onClick={() => toggleFormat('list', 'bullet')}
          className={`rounded px-2 py-1 ${
            activeFormats.list === 'bullet'
              ? 'bg-blue-300'
              : 'hover:bg-gray-300 bg-gray-200'
          }`}
          aria-label='Bullet List'
        >
          <RiListUnordered className='text-xl' />
        </button>
        <button
          className='ql-indent bg-gray-200 rounded px-2 py-1 hover:bg-gray-300'
          value='-1'
          aria-label='Indent Less'
        >
          <MdFormatIndentDecrease className='text-xl' />
        </button>
        <button
          className='ql-indent bg-gray-200 rounded px-2 py-1 hover:bg-gray-300'
          value='+1'
          aria-label='Indent More'
        >
          <MdFormatIndentIncrease className='text-xl' />
        </button>
        <button
          className='ql-clean bg-red-200 text-red-700 rounded px-2 py-1 hover:bg-red-300'
          aria-label='Clear Formatting'
        >
          <MdOutlineFormatClear className='text-xl' />
        </button>
      </div>

      {/* Rich Text Editor */}
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleTextInput}
        onChangeSelection={handleSelectionChange}
        modules={modules}
        theme={null}
        className='rounded border border-gray-300 min-h-64 h-auto bg-gray-50'
      />
      <button
        onClick={handleSave}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Submit
      </button>
    </div>
  );
};

export default RichTextEditor;
