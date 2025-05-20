import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({input, setInput}) => {
    function handlechange(value){
        setInput(prev => ({
            ...prev,
            description:value
        }));
    }

    return <ReactQuill theme="snow" value={input.description} onChange={handlechange} />;
}

export default RichTextEditor
