import { useState } from 'react';
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

  // Custom Toolbar Options
  const modules = {
    toolbar: {
      container: '#toolbar', // Attach custom toolbar
    },
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
  ];

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log(content);
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-md w-full max-w-2xl'>
      {/* Custom Toolbars */}
      <div
        id='toolbar'
        className='mb-2 flex gap-2 bg-gray-100 p-2 rounded border border-gray-300'
      >
        <button
          className='ql-bold bg-gray-200 rounded px-2 py-1 hover:bg-gray-300'
          aria-label='Bold'
        >
          <FaBold />
        </button>
        <button
          className='ql-italic bg-gray-200 rounded px-2 py-1 hover:bg-gray-300'
          aria-label='Italic'
        >
          <FaItalic />
        </button>
        <button
          className='ql-underline bg-gray-200 rounded px-2 py-1 hover:bg-gray-300'
          aria-label='Underline'
        >
          <FaUnderline className='text-lg' />
        </button>
        <button
          className='ql-list bg-gray-200 rounded px-2 py-1 hover:bg-gray-300'
          value='ordered'
          aria-label='Ordered List'
        >
          <VscListOrdered className='text-2xl' />
        </button>
        <button
          className='ql-list bg-gray-200 rounded px-2 py-1 hover:bg-gray-300'
          value='bullet'
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
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
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
